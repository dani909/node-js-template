echo "{}" > settings.json

if [ "$IMAGE" = "RPI" ]; then
    docker run --rm --privileged multiarch/qemu-user-static:register --reset
    docker build . -f RPI.Dockerfile
else
    docker build .
fi
