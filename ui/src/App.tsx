
// ui/src/App.tsx
import React, { useEffect } from 'react';
import {
  GridActionsCellItem,
} from "@mui/x-data-grid-pro";
import {
  Box,
  Link,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tooltip,
  Typography
} from "@mui/material";
import {
  Download as DownloadIcon,
} from "@mui/icons-material";
import { createDockerDesktopClient } from "@docker/extension-api-client";

//obtain docker destkop extension client
const ddClient = createDockerDesktopClient();

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function handlePull(image: string) {

ddClient.docker.cli.exec("pull", [
    image,
  ], {
  stream: {
    onOutput(data) {
      if (data.stdout) {
        console.error(data.stdout);
      } else {
        console.log(data.stderr);
      }
    },
    onError(error) {
      ddClient.desktopUI.toast.error("Error: " + error);
      console.error(error);
    },
    onClose(exitCode) {
      console.log("onClose with exit code " + exitCode);
      if(exitCode == 0) {
        ddClient.desktopUI.toast.success("The image " + image + " have been correctly pulled");
      }
    },
    splitOutputLines: true,
  },
});

}

export function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Stack>

      <Typography data-testid="heading" variant="h3" role="title">
        OVHcloud images list
      </Typography>
      <Typography
      data-testid="subheading"
      variant="body1"
      color="text.secondary"
      sx={{ mt: 2 }}
    >
      List of useful images created by OVHcloud hosted on  

		<Link
    href="#"
    onClick={() => {
      ddClient.host.openExternal("https://hub.docker.com/u/ovhcom");
    }}
    > https://hub/docker.com/u/ovhcom</Link>.
      </Typography>


      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Kubernetes" {...a11yProps(0)} />
          <Tab label="AI" {...a11yProps(1)} />
          <Tab label="Tools" {...a11yProps(2)} />
        </Tabs>

        <CustomTabPanel value={value} index={0}>

          <TableContainer sx={{mt:2}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Documentation</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>ovhcom/public-cloud-databases-operator</TableCell>
                <TableCell>The Kubernetes Database operator allows you to automaticaly authorize your Kubernetes cluster IP on your OVHcloud Public Cloud Databases service.</TableCell>
                <TableCell>
                  <Link
                  href="#"
                  onClick={() => {
                        ddClient.host.openExternal("https://help.ovhcloud.com/csm/fr-ca-public-cloud-databases-database-operator?id=kb_article_view&sysparm_article=KB0058463");
                      }}
                      >
                    help.ovhcloud.com
                    </Link>

                  </TableCell>

                <TableCell> <GridActionsCellItem
            key={"action_pull_ovhcom/public-cloud-databases-operator"}
            icon={
              <Tooltip title="Pull">
                <DownloadIcon>Pull</DownloadIcon>
              </Tooltip>
            }
            label="Pull"
            onClick={() => handlePull("ovhcom/public-cloud-databases-operator")}
          /></TableCell>
              </TableRow>

              <TableRow>
                <TableCell>ovhcom/python-cpu-load</TableCell>
                <TableCell>The Python CPU load goal is to consume all the CPU allocated to it. It's a CPU intensive operation but it uses a minimal amount of memory.</TableCell>
                <TableCell>
                  <Link
                  href="#"
                  onClick={() => {
                        ddClient.host.openExternal("https://help.ovhcloud.com/csm/fr-ca-public-cloud-kubernetes-cluster-autoscaler-example?id=kb_article_view&sysparm_article=KB0054915");
                      }}
                      >
                    help.ovhcloud.com
                    </Link>

                  </TableCell>

                <TableCell> <GridActionsCellItem
            key={"action_pull_ovhcom/python-cpu-load"}
            icon={
              <Tooltip title="Pull">
                <DownloadIcon>Pull</DownloadIcon>
              </Tooltip>
            }
            label="Pull"
            onClick={() => handlePull("ovhcom/python-cpu-load")}
          /></TableCell>
              </TableRow>

            </TableBody>
          </Table>
          </TableContainer>

        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Coming soon: AI images from private registries
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>

          <TableContainer sx={{mt:2}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Documentation</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>ovhcom/utask</TableCell>
                <TableCell>µTask is an automation engine that models and executes business processes declared in YAML.</TableCell>
                <TableCell>
                  <Link
                  href="#"
                  onClick={() => {
                        ddClient.host.openExternal("https://github.com/ovh/utask/");
                      }}
                      >
                    github.com/ovh/utask
                    </Link>

                  </TableCell>

                <TableCell> <GridActionsCellItem
            key={"action_pull_ovhcom/utask"}
            icon={
              <Tooltip title="Pull">
                <DownloadIcon>Pull</DownloadIcon>
              </Tooltip>
            }
            label="Pull"
            onClick={() => handlePull("ovhcom/utask")}
          /></TableCell>
              </TableRow>

              <TableRow>
                <TableCell>ovhcom/venom</TableCell>
                <TableCell>Manage and run your integration tests with efficiency - Venom run executors (script, HTTP Request, web, imap, etc... ) and assertions.</TableCell>
                <TableCell>
                  <Link
                  href="#"
                  onClick={() => {
                        ddClient.host.openExternal("https://github.com/ovh/venom");
                      }}
                      >
                    github.com/ovh/venom
                    </Link>

                  </TableCell>

                <TableCell> <GridActionsCellItem
            key={"action_pull_ovhcom/venom"}
            icon={
              <Tooltip title="Pull">
                <DownloadIcon>Pull</DownloadIcon>
              </Tooltip>
            }
            label="Pull"
            onClick={() => handlePull("ovhcom/venom")}
          /></TableCell>
              </TableRow>

              <TableRow>
                <TableCell>ovhcom/cds-engine</TableCell>
                <TableCell>Enterprise-Grade Continuous Delivery & DevOps Automation Open Source Platform.</TableCell>
                <TableCell>
                  <Link
                  href="#"
                  onClick={() => {
                        ddClient.host.openExternal("https://ovh.github.io/cds/");
                      }}
                      >
                    ovh.github.io/cds/
                    </Link>

                  </TableCell>

                <TableCell> <GridActionsCellItem
            key={"action_pull_ovhcom/cds-engine"}
            icon={
              <Tooltip title="Pull">
                <DownloadIcon>Pull</DownloadIcon>
              </Tooltip>
            }
            label="Pull"
            onClick={() => handlePull("ovhcom/cds-engine")}
          /></TableCell>
              </TableRow>

            </TableBody>
          </Table>
          </TableContainer>

        </CustomTabPanel>
      </Box>

    </Stack>
  );
}
