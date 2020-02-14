import React from "react";
import { View } from 'react-native';
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-expo";

const shaders = Shaders.create({
  Saturate: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D t;
uniform float contrast, saturation, brightness;
const vec3 L = vec3(0.2125, 0.7154, 0.0721);
void main() {
  vec4 c = texture2D(t, uv);
	vec3 brt = c.rgb * brightness;
	gl_FragColor = vec4(mix(
    vec3(0.5),
    mix(vec3(dot(brt, L)), brt, saturation),
    contrast), c.a);
}
`
  }
});

// export class HelloBlue extends React.Component {
//   render() {
//     const { blue } = this.props;
//     return <Node shader={shaders.helloBlue} uniforms={{ blue }} />;
//   }
// }

export const Saturate = ({ contrast, saturation, brightness, imageUri }) => (
    <Node
    shader={shaders.Saturate}
    uniforms={{ contrast, saturation, brightness, t: imageUri }}
  />);

export default class Example extends React.Component {
  render() {
    let imageUri = this.props.imageUri;
    return (
      <Surface style={{ width: 450, height: 450}}>
        <Saturate {...this.props} imageUri={imageUri}>
          {imageUri}
        </Saturate>
      </Surface>
      );
    }
    
  }
  
