#echo "Deploying to CF ..."
echo "------------------"
echo "------------------"
echo "Run SVILUPPO"
echo "------------------"
echo "------------------"
sh ./bnd_sviluppo.sh


echo "------------------"
echo "------------------"
echo "Run COLLAUDO"
echo "------------------"
echo "------------------"
sh ./bnd_collaudo.sh


echo "------------------"
echo "------------------"
echo "Run COLLAUDO_REGIS"
echo "------------------"
echo "------------------"
sh ./bnd_collaudo_regis.sh