import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

.Container {
height: 100lvh;
}
.wrapper{
width: 100%;
height:100px;
display:flex;
justify-content:center;
align-items:center;
background-color:transparent}.checkmark__circle{stroke-dasharray: 166;
stroke-dashoffset: 166;stroke-width: 2;
stroke-miterlimit: 10;
stroke: #7ac142;fill: none;
animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards}.checkmark{width: 56px;height: 56px;border-radius: 50%;display: block;
stroke-width: 2;stroke: #fff;
stroke-miterlimit: 10;margin: 10% auto;
box-shadow: inset 0px 0px 0px #7ac142;
animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both}.checkmark__check{transform-origin: 50% 50%;stroke-dasharray: 48;
stroke-dashoffset: 48;
animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards}
@keyframes stroke{100%{stroke-dashoffset: 0}}
@keyframes scale{0%, 100%{transform: none}50%{transform: scale3d(1.1, 1.1, 1)}}
@keyframes fill{100%{box-shadow: inset 0px 0px 0px 30px #7ac142}
}
`