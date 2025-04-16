uniform float zoom;
uniform float xOffset;
uniform float yOffset;

uniform int palette;
uniform int colorScaler;
uniform int pixelFixer = 1; //multiplying offset by uniform value allows for greater zooms???? probably more bits allocated to it, but idk
void main()
{

    float offsetX = (gl_FragCoord.x-xOffset)*(1/zoom)+(xOffset-(1920*pixelFixer)/2);
    float offsetY = (gl_FragCoord.y-yOffset)*(1/zoom)+(yOffset-(1080*pixelFixer)/2);
    float x = 0;
    float y = 0;
    float xtemp = 0;
    int iteration = 0;
    const int maxIteration = 1000;

    while(x*x + y*y <= (2*2) && iteration < maxIteration)
    {
        xtemp = x*x - y*y + offsetX;
        y = 2*x*y + offsetY;
        x = xtemp;
        iteration++;
    }

    if(iteration==maxIteration)
        gl_FragColor = 0;
    else
        if(palette == 0)gl_FragColor =
            vec4(1-0.5/iteration * (sqrt(zoom/100)+colorScaler), 0, 0.4+(1 - 0.5/iteration*colorScaler), 1);
        else if(palette == 1)
            gl_FragColor = vec4(0.5/iteration * (sqrt(zoom/100)+colorScaler), 0, 0.5, 1);
        else if(palette == 2)
            gl_FragColor = vec4(1-0.5/iteration * (sqrt(zoom/100)+colorScaler),1-0.5/iteration * (sqrt(zoom/100)+colorScaler),1-0.5/iteration * (sqrt(zoom/100)+colorScaler), 1);


}

