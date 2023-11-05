'use client'
import { FC, Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Vector2 } from 'three'

const vertexShader = `
void main() {
  gl_Position = vec4( position, 1.0 );
}
`

const fragmentShader = `
precision highp float;
uniform float time;
uniform vec2 resolution;


//	Simplex 3D Noise
//	by Ian McEwan, Ashima Arts
//
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //  x0 = x0 - 0. + 0.0 * C
  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1. + 3.0 * C.xxx;

// Permutations
  i = mod(i, 289.0 );
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients
// ( N*N points uniformly over a square, mapped onto an octahedron.)
  float n_ = 1.0/7.0; // N=7
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}

vec3 wave(vec2 p) {
  vec3 c = vec3(0.0);

  float nx = p.x * snoise(vec3(0.5, 0.5, 0.1)) + time / 20.0;
  float ny = p.y * 5.5 + sin(time);
  float nz = atan(0.1 + time);

  c = vec3(snoise(vec3(1.2 * snoise(vec3(p.y * 2.4, p.x * 0.2, time * 0.1)),  0.6 , nz * 0.1)) );

  return c;
}


void main(void) {
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec3 color1 = vec3(0.92, 0.51, 0.88);
  vec3 color2 = vec3(0.14, 0.85, 1.0);
  float mixValue = distance(uv * 10.0, uv * 0.3);
  // vec3 color = mix(color1, color2 , mixValue) ;
  // color.y += snoise(vec3(uv * 0.5, time));

  vec3 c = vec3(0.0);

  c = wave(vec2(uv.x, uv.y));

  c = vec3(
    smoothstep(0.2, 1.0, c.x),
    c.y,
    0.2 + 0.7 * c.z
  );

  vec3 color = mix(color1, color2 , uv.y) * c;


  gl_FragColor = vec4(color, 1.0);
}
`

const Plane: FC = () => {
  const ref = useRef<any>()
  const { size } = useThree()
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    const timeUntilNextFrame = 1000 / 30 - clock.getDelta()
    setTimeout(() => {
      ;(ref.current as any).material.uniforms.time.value = time
    }, Math.max(0, timeUntilNextFrame))
  })

  const PurpleShader = {
    fragmentShader,
    uniforms: {
      resolution: {
        type: 'fv2',
        value: new Vector2(size.width, size.height),
      },
      time: { type: 'f', value: 1.0 },
    },
    vertexShader,
  }

  return (
    <mesh ref={ref}>
      <planeGeometry args={[2, 2, 2]} attach="geometry" />
      <shaderMaterial args={[PurpleShader]} attach="material" />
    </mesh>
  )
}

export const BgCanvas: FC<{}> = () => {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ far: 10000, fov: 60, near: 0.01, position: [-1, 1, 1] }}
        dpr={1}
      >
        <ambientLight intensity={0.85} />
        <Suspense fallback={null}>
          <Plane />
        </Suspense>
      </Canvas>
    </div>
  )
}
