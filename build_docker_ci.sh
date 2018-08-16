echo "{}" > settings.json

docker run --rm --privileged multiarch/qemu-user-static:register --reset

docker build . -t node-js-template:latest
docker build . -f RPI.Dockerfile -t node-js-template:latest-RPI