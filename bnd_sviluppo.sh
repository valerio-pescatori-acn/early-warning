version_file='src/services/Version.js'
package_file='./package.json'

oldversion="$(cat ${package_file} | jq -r '.version')"
echo "Old version: $oldversion"

major="$(echo $oldversion | cut -d'.' -f 1)"
minor="$(echo $oldversion | cut -d'.' -f 2)"
patch="$(echo $oldversion | cut -d'.' -f 3)"

patch=$((patch+1))

newversion="$major.$minor.$patch"
echo "$newversion"

tmp=$(mktemp)
jq --arg a "$newversion" '.version = $a' $package_file > $tmp && mv $tmp $package_file

echo "Replacing version in Version.js ..."
echo "export const version = \"$newversion\";" > $version_file

#echo "Building..."
mbt build

#echo "Deploying to CF ..."
cf t -o "Sogei Spa_regis-sviluppo-q8rh8azo"

cf deploy mta_archives/bandiregis_1.0.1.mtar -f

echo "Deployment complete!"
