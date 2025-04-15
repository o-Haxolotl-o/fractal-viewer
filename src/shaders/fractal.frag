uniform float zoom;
uniform float xOffset;
uniform float yOffset;

void main()
{
    float offsetX = (gl_FragCoord.x-xOffset)*(1/zoom);
    float offsetY = (gl_FragCoord.y-yOffset)*(1/zoom);
    float x = 0;
    float y = 0;
    float xtemp = x*x - y*y + offsetX;
    int iteration = 0;
    const int maxIteration = 1000;

    while(x*x + y*y <= (4) && iteration < maxIteration)
    {
        xtemp = x*x - y*y + offsetX;
        y = 2*x*y + offsetY;
        x = xtemp;
        iteration++;
    }

    if(iteration==maxIteration)
        gl_FragColor = 0;
    else
        gl_FragColor = vec4(0.5/iteration * sqrt(zoom/2),0,0.5,1);

}

