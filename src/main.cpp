#include <cmath>
#include <SFML/Graphics.hpp>
#include <iostream>

int main()
{
    auto window = sf::RenderWindow(sf::VideoMode({1920u, 1080u}), "CMake SFML Project");
    window.setFramerateLimit(144);

    float zoom = 200;
    float xOffset = 1920/2;
    float yOffset = 1080/2;

    constexpr int palette = 0;
    constexpr int colorScaler = 40;

    //init fractal shader
    sf::Shader fractalShader;
    sf::RenderTexture fractalTexture{{1920u,1080u}}; //render texture to apply shader to
    sf::Sprite fractalSprite(fractalTexture.getTexture());
    if (!fractalShader.loadFromFile("../../src/shaders/fractal.vert","../../src/shaders/fractal.frag"))
        std::cerr << "Could not load fractal shader" << std::endl;



    while (window.isOpen())
    {
        while (const std::optional event = window.pollEvent())
        {
            if (event->is<sf::Event::Closed>())
            {
                window.close();
            }
            if (const auto* mouseWheelScrolled = event->getIf<sf::Event::MouseWheelScrolled>()) {
                if(mouseWheelScrolled->delta>0)
                    zoom += mouseWheelScrolled->delta * (zoom );
                else
                    zoom += mouseWheelScrolled->delta * (zoom )/2;

            }

            if(const auto* mouseMovedRaw = event->getIf<sf::Event::MouseMovedRaw>()) {
                if(sf::Mouse::isButtonPressed(sf::Mouse::Button::Left)) {
                    xOffset -= mouseMovedRaw->delta.x/zoom;
                    yOffset += mouseMovedRaw->delta.y/zoom;
                }
            }

        }
        if(zoom < 200)
            zoom = 200;
        
        fractalShader.setUniform("zoom", zoom);
        fractalShader.setUniform("xOffset", xOffset);
        fractalShader.setUniform("yOffset", yOffset);

        fractalShader.setUniform("palette", palette);
        fractalShader.setUniform("colorScaler", colorScaler);

        window.clear();
        window.draw(fractalSprite, &fractalShader);
        window.display();
    }
}
