Services
========
* Vagrant    - Kerfi sem býr til og sér um virtual machines
* VirtualBox - Býr til virtual machines, keyrir undir Vagrant
* Grunt      - Keyrir automated tasks sem notandi getur skilgreint
* npm        - Pakka manager fyrir node forrit
* nodejs     - Async Javascript run time environment
* bower      - Svipað og npm, setur inn packages sem client notar

Setup
=====
Setti upp droplet á digitalOcean þar sem tölvan mín er ekki sú besta á markaðnum.
Skrifaði deployScript til að láta serverinn stoppa docker image, ná í nýjasta og keyra það af stað.

Setti upp jenkins með apt-get. Startaði jenkins á porti 8080.

Jenkins er nú með tictactoe project á því sem keyrir npm install - bower install og loks ./dockerbuild.sh
Einnig setti ég upp tvö plugins á jenkins: Github - svo að hann keyrir project þegar breytingar eru sendar á git repo.
Náði líka í xvfb plugin sem lætur það líta út fyrir að keyra upp firefox fyrir Karma.

Load tests - Day 9
==================
Load testin eru keyrð samtímis en hvert test keyrir í röð == serial.

Day 10
======
Getum þá deployað hvaða version (sem hefur buildast) sem er með því að pulla frá dockerhub með réttu tag.
Ætti að vera pushað strax til að tryggja að sama tag er notað.
- Ég náði ekki að gera þetta skref nógu vel, svo að dockerbuild.sh er það sem ég notaði áður, dockerbuild_adv.sh er það sem hefði notast við þetta
- Mig vantaði að nota deploy script betur og nota þar git tagið til að merkja docker containers
- Einnig hefði ég sennilega átt að setja parameter á deploy til að deploya tvisvar á mismunandi port fyrir acceptance og capacity tests

Jenkins scripts
===============
Commit stage
------------
npm install
bower install
./dockerbuild.sh

Deploy/Acceptance stage
-----------------------
./deploy.sh root@188.166.28.28
./acceptance.sh

Capacity stage
--------------
./capacityTest.sh
