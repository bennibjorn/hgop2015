* Vagrant    - Kerfi sem býr til og sér um virtual machines
* VirtualBox - Býr til virtual machines, keyrir undir Vagrant
* Grunt      - Keyrir automated tasks sem notandi getur skilgreint
* npm        - Pakka manager fyrir node forrit
* nodejs     - Javascript framework
* bower      - Svipað og npm, setur inn packages sem notandi vill

Setti upp droplet á digitalOcean þar sem tölvan mín er ekki sú besta á markaðnum.
Skrifaði deployScript til að láta serverinn stoppa docker image, ná í nýjasta og keyra það af stað.

Setti upp jenkins með apt-get á droplet. Startaði jenkins á porti 8081.
"iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8081" - Leyfir mér að komast inn í jenkins með því að fara inn á IP-töluna á droplet.

Jenkins er nú með tictactoe project á því sem keyrir npm install - bower install og loks ./dockerbuild.sh
Einnig setti ég upp tvö plugins á jenkins: Github - svo að hann keyrir project þegar breytingar eru sendar á git repo.
Náði líka í xvfb plugin sem lætur það líta út fyrir að keyra upp firefox fyrir Karma.
