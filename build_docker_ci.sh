echo "{}" > settings.json

if [ "$IMAGE" = "RPI" ]; then
    docker run --rm --privileged multiarch/qemu-user-static:register --reset
    docker build . -f RPI.Dockerfile -t node-js-template:latest-RPI
else
    docker build . -t node-js-template:latest
fi
