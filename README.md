# OVHcloud Images

In this repository you can find the OVHcloud images Docker extension.

This extension is composed of:

- A [frontend](./ui) app in React that display a list of OCI images created and maintaned by OVHcloud. Through this app users can pull images directly on their machine through Docker Desktop.

## Local development

Build the extension:
```shell
$ make build-extension
```

Install the extension:
```shell
$ make install-extension
```

Update the extension:
```shell
$ make update-extension
```

Push the extension:
```shell
$ make push-extension
```

### Frontend development

During the development of the frontend part, it's helpful to use hot reloading to test your changes without rebuilding your entire extension. To do this, you can configure Docker Desktop to load your UI from a development server.
Assuming your app runs on the default port, start your UI app and then run:

```shell
  cd ui
  npm install
  npm run dev
```

This starts a development server that listens on port `3000`.

You can now tell Docker Desktop to use this as the frontend source. In another terminal run:

```shell
  docker extension dev ui-source scraly/ovhimages-extension:latest http://localhost:3000
```

In order to open the Chrome Dev Tools for your extension when you click on the extension tab, run:

```shell
  docker extension dev debug scraly/ovhimages-extension:latest
```

Each subsequent click on the extension tab will also open Chrome Dev Tools. To stop this behaviour, run:

```shell
  docker extension dev reset scraly/ovhimages-extension:latest
```

### Clean up

To remove the extension:

```shell
docker extension rm scraly/ovhimages-extension:latest
```