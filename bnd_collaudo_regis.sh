#echo "Deploying to CF ..."
cf t -o "Sogei Spa_regis-collaudo-66hdyn9z"

cf deploy mta_archives/bandiregis_1.0.1.mtar -f

#cf map-route bandiregis_approuter regis-portalebandi-coll.rgs.mef.gov.it

echo "Deployment complete!"
