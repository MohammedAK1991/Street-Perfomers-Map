import React from 'react';
import { Global } from '@emotion/react';

export default function Fonts() {
  return (
    <Global
      styles={`
        /* latin */
          @font-face {
              font-family: 'Manrope';
              font-weight: 800;
              src: url('/fonts/Manrope_ExtraBold.ttf');
          }
          @font-face {
              font-family: 'Manrope';
              font-weight: 700;
              src: url('/fonts/Manrope_Bold.ttf');
          }
          @font-face {
              font-family: 'Manrope';
              font-weight: 600;
              src: url('/fonts/Manrope_SemiBold.ttf');
          }
          @font-face {
              font-family: 'Manrope';
              font-weight: 500;
              src: url('/fonts/Manrope_Medium.ttf');
          }
          @font-face {
              font-family: 'Manrope';
              font-weight: 400;
              src: url('/fonts/Manrope_Regular.ttf');
          }
          @font-face {
              font-family: 'Manrope';
              font-weight: 300;
              src: url('/fonts/Manrope_Light.ttf');
          }
          @font-face {
              font-family: 'Manrope';
              font-weight: 200;
              src: url('/fonts/Manrope_ExtraLight.ttf');
          }
          @font-face {
            font-family: Euclid;
            font-weight: 700;
            src: url('/fonts/EuclidCircular-Bold.ttf');
          }
          @font-face {
            font-family: Euclid;
            font-weight: 600;
            src: url('/fonts/EuclidCircular-SemiBold.ttf');
          }
          @font-face {
            font-family: Euclid;
            font-weight: 500;
            src: url('/fonts/EuclidCircular-Medium.ttf');
          }
          @font-face {
            font-family: Euclid;
            font-weight: 400;
            src: url('/fonts/EuclidCircular-Regular.ttf');
          }
        `}
    />
  );
}
