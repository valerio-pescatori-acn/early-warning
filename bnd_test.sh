#echo "Deploying to CF ..."
cf t -o "Sogei Spa_portaleregis-test-rk31rios"

cf deploy mta_archives/bandiregis_1.0.1.mtar -f

cf map-route bandiregis_approuter regis-portale-enti-test.rgs.mef.gov.it

echo "Deployment complete!"
