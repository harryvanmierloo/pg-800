export default  {
    knobX: 71,
    knobY: 71,
    svg:`
<svg width="204px" height="204px" viewBox="0 0 204 204" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <linearGradient id="linearGradient-1" gradientUnits="userSpaceOnUse" x1="29.8751" y1="29.8751" x2="174.1249" y2="174.1249" gradientTransform="matrix(-1 0 0 -1 204 204)">
            <stop offset="0" style="stop-color:#888888"/>
            <stop offset="1" style="stop-color:#141414"/>
        </linearGradient>
        <circle id="path-2" cx="98" cy="98" r="98"></circle>
        <filter x="-3.3%" y="-3.3%" width="106.6%" height="106.6%" filterUnits="objectBoundingBox" id="filter-3">
            <feMorphology radius="0.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
            <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1"></feComposite>
            <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
        </filter>
        <linearGradient x1="0%" y1="0%" x2="80%" y2="80%" id="linearGradient-4">
            <stop offset="0" style="stop-color:#888888"/>
            <stop offset="1" style="stop-color:#141414"/>
        </linearGradient>
        <circle id="path-5" cx="98" cy="98" r="92"></circle>
        <filter x="-4.1%" y="-3.5%" width="108.1%" height="108.1%" filterUnits="objectBoundingBox" id="filter-6">
            <feMorphology radius="0.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
            <feOffset dx="0" dy="1" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1"></feComposite>
            <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0     0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
        </filter>
    </defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="s13" transform="translate(4.000000, 4.000000)">
            <g id="container">
                <g id="Oval-2">
                    <use fill="black" fill-opacity="1" filter="url(#filter-3)" xlink:href="#path-2"></use>
                    <use fill="url(#linearGradient-1)" fill-rule="evenodd" xlink:href="#path-2"></use>
                </g>
                <g id="Oval-2">
                    <use fill="black" fill-opacity="1" filter="url(#filter-6)" xlink:href="#path-5"></use>
                    <use fill="" fill-rule="evenodd" xlink:href="#path-5"></use>
                    <use stroke="#4A4A4A" stroke-width="1" fill="url(#linearGradient-4)" fill-rule="evenodd" xlink:href="#path-5"></use>
                </g>
                <g id="knob" transform="translate(27.431373, 27.431373)">
                    <circle id="Oval-5" fill="#505050" cx="71" cy="71" r="71"></circle>
                    <circle fill="#E7B791" cx="71" cy="16" r="8"/>
                </g>
            </g>
        </g>
    </g>
</svg>
`
}



{/* <svg width="204px" height="204px" viewBox="0 0 204 204" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <style type="text/css">
        .st0{fill:url(#SVGID_1_);}
        .st1{fill:url(#SVGID_2_);}
        .st2{fill:#505050;}
        .st3{fill:#E7B791;}
    </style>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="container">
            <g id="knob-bg">
                <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="29.8751" y1="29.8751" x2="174.1249" y2="174.1249" gradientTransform="matrix(-1 0 0 -1 204 204)">
                    <stop offset="0" style="stop-color:#888888"/>
                    <stop offset="1" style="stop-color:#141414"/>
                </linearGradient>
                <circle class="st0" cx="102" cy="102" r="102"/>
                <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="32.7035" y1="32.7035" x2="171.2965" y2="171.2965">
                    <stop offset="0" style="stop-color:#888888"/>
                    <stop offset="1" style="stop-color:#141414"/>
                </linearGradient>
                <circle class="st1" cx="102" cy="102" r="94"/>
            </g>
            <g id="knob" transform="translate(27.431373, 27.431373)">
                <circle class="st2" cx="71" cy="71" r="74"/>
                <circle class="st3" cx="71" cy="16" r="8"/>
            </g>
        </g>
    </g>
</svg> */}