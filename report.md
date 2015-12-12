* Vagrant    - Kerfi sem býr til og sér um virtual machines
* VirtualBox - Býr til virtual machines, keyrir undir Vagrant
* Grunt      - Keyrir automated tasks sem notandi getur skilgreint
* npm        - Pakka manager fyrir node forrit
* nodejs     - Javascript framework
* bower      - Svipað og npm, setur inn packages sem notandi vill

Setti upp droplet á digitalOcean þar sem tölvan mín er ekki sú besta á markaðnum.
Skrifaði deployScript til að láta serverinn stoppa docker image, ná í nýjasta og keyra það af stað.

Setti upp jenkins með apt-get. Startaði jenkins á porti 8080.

Jenkins er nú með tictactoe project á því sem keyrir npm install - bower install og loks ./dockerbuild.sh
Einnig setti ég upp tvö plugins á jenkins: Github - svo að hann keyrir project þegar breytingar eru sendar á git repo.
Náði líka í xvfb plugin sem lætur það líta út fyrir að keyra upp firefox fyrir Karma.

Gerði eiginlega óvart day6 verkefnið þar sem ég nennti ekki að nota curl eða postman til að vera endalaust að sjá svör frá API.
Þannig að ég setti upp smá framenda þar sem ég get sett inn nickname og gamename og með takka "create game", þá kallar hann á createGame í API og sýnir niðurstöðuna á framenda.
