import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {Graph} from "../Components/Graph.tsx";
import "../styles/UserList.css";

import { ResponsiveNetwork } from '@nivo/network'

 function GraphData(props) {
    const {id} = useParams();

  var data = [];
  var nodes = [];
  var links = [];

  const data2 = {
    "nodes": [
    {
      "id": "Node 1",
      "height": 1,
      "size": 24,
      "color": "rgb(97, 205, 187)"
    },
    {
      "id": "Node 2",
      "height": 1,
      "size": 24,
      "color": "rgb(97, 205, 187)"
    },
    {
      "id": "Node 3",
      "height": 1,
      "size": 24,
      "color": "rgb(97, 205, 187)"
    },
    {
      "id": "Node 4",
      "height": 1,
      "size": 24,
      "color": "rgb(97, 205, 187)"
    },
    {
      "id": "Node 5",
      "height": 1,
      "size": 24,
      "color": "rgb(97, 205, 187)"
    },
    {
      "id": "Node 6",
      "height": 1,
      "size": 24,
      "color": "rgb(97, 205, 187)"
    },
    {
      "id": "Node 7",
      "height": 1,
      "size": 24,
      "color": "rgb(97, 205, 187)"
    },
    {
      "id": "Node 8",
      "height": 1,
      "size": 24,
      "color": "rgb(97, 205, 187)"
    },
    {
      "id": "Node 9",
      "height": 1,
      "size": 24,
      "color": "rgb(97, 205, 187)"
    },
    {
      "id": "Node 10",
      "height": 1,
      "size": 24,
      "color": "rgb(97, 205, 187)"
    },
    {
      "id": "Node 11",
      "height": 1,
      "size": 24,
      "color": "rgb(97, 205, 187)"
    },
    {
      "id": "Node 12",
      "height": 1,
      "size": 24,
      "color": "rgb(97, 205, 187)"
    },
    {
      "id": "Node 13",
      "height": 1,
      "size": 24,
      "color": "rgb(97, 205, 187)"
    },
    {
      "id": "Node 14",
      "height": 1,
      "size": 24,
      "color": "rgb(97, 205, 187)"
    },
    {
      "id": "Node 15",
      "height": 1,
      "size": 24,
      "color": "rgb(97, 205, 187)"
    },
    {
      "id": "Node 0",
      "height": 2,
      "size": 32,
      "color": "rgb(244, 117, 96)"
    },
    {
      "id": "Node 1.0",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 1.1",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 1.2",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 1.3",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 1.4",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 1.5",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 1.6",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 2.0",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 2.1",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 2.2",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 2.3",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 2.4",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 2.5",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 2.6",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 2.7",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 2.8",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 2.9",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 3.0",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 3.1",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 3.2",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 3.3",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 3.4",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 3.5",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 3.6",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 3.7",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 3.8",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 3.9",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 3.10",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 3.11",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 4.0",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 4.1",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 4.2",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 4.3",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 4.4",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 4.5",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 4.6",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 4.7",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 4.8",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 4.9",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 4.10",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 4.11",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 5.0",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 5.1",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 5.2",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 5.3",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 5.4",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 5.5",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 5.6",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 6.0",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 6.1",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 6.2",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 6.3",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 6.4",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 6.5",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 6.6",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 6.7",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 6.8",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 6.9",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 6.10",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 6.11",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 7.0",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 7.1",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 7.2",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 7.3",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 7.4",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 7.5",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 7.6",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 8.0",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 8.1",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 8.2",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 8.3",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 8.4",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 8.5",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 8.6",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 8.7",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 8.8",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 8.9",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 9.0",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 9.1",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 9.2",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 9.3",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 9.4",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 9.5",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 9.6",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 10.0",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 10.1",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 10.2",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 10.3",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 10.4",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 10.5",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 10.6",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 11.0",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 11.1",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 11.2",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 11.3",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 11.4",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 11.5",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 11.6",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 12.0",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 12.1",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 12.2",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 12.3",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 12.4",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 12.5",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 12.6",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 12.7",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 12.8",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 12.9",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 13.0",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 13.1",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 13.2",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 13.3",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 13.4",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 13.5",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 13.6",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 13.7",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 13.8",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 13.9",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 13.10",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 14.0",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 14.1",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 14.2",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 14.3",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 14.4",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 14.5",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 14.6",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 14.7",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 14.8",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 14.9",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 14.10",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 14.11",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 15.0",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 15.1",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 15.2",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 15.3",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 15.4",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 15.5",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 15.6",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    },
    {
      "id": "Node 15.7",
      "height": 0,
      "size": 12,
      "color": "rgb(232, 193, 160)"
    }
  ],
  "links": [
    {
      "source": "Node 0",
      "target": "Node 1",
      "distance": 80
    },
    {
      "source": "Node 1",
      "target": "Node 14",
      "distance": 80
    },
    {
      "source": "Node 1",
      "target": "Node 1.0",
      "distance": 50
    },
    {
      "source": "Node 1",
      "target": "Node 1.1",
      "distance": 50
    },
    {
      "source": "Node 1",
      "target": "Node 1.2",
      "distance": 50
    },
    {
      "source": "Node 1",
      "target": "Node 1.3",
      "distance": 50
    },
    {
      "source": "Node 1",
      "target": "Node 1.4",
      "distance": 50
    },
    {
      "source": "Node 1",
      "target": "Node 1.5",
      "distance": 50
    },
    {
      "source": "Node 1",
      "target": "Node 1.6",
      "distance": 50
    },
    {
      "source": "Node 0",
      "target": "Node 2",
      "distance": 80
    },
    {
      "source": "Node 2",
      "target": "Node 2.0",
      "distance": 50
    },
    {
      "source": "Node 2",
      "target": "Node 2.1",
      "distance": 50
    },
    {
      "source": "Node 2",
      "target": "Node 2.2",
      "distance": 50
    },
    {
      "source": "Node 2",
      "target": "Node 2.3",
      "distance": 50
    },
    {
      "source": "Node 2",
      "target": "Node 2.4",
      "distance": 50
    },
    {
      "source": "Node 2",
      "target": "Node 2.5",
      "distance": 50
    },
    {
      "source": "Node 2",
      "target": "Node 2.6",
      "distance": 50
    },
    {
      "source": "Node 2",
      "target": "Node 2.7",
      "distance": 50
    },
    {
      "source": "Node 2",
      "target": "Node 2.8",
      "distance": 50
    },
    {
      "source": "Node 2",
      "target": "Node 2.9",
      "distance": 50
    },
    {
      "source": "Node 0",
      "target": "Node 3",
      "distance": 80
    },
    {
      "source": "Node 3",
      "target": "Node 5",
      "distance": 80
    },
    {
      "source": "Node 3",
      "target": "Node 7",
      "distance": 80
    },
    {
      "source": "Node 3",
      "target": "Node 3.0",
      "distance": 50
    },
    {
      "source": "Node 3",
      "target": "Node 3.1",
      "distance": 50
    },
    {
      "source": "Node 3",
      "target": "Node 3.2",
      "distance": 50
    },
    {
      "source": "Node 3",
      "target": "Node 3.3",
      "distance": 50
    },
    {
      "source": "Node 3",
      "target": "Node 3.4",
      "distance": 50
    },
    {
      "source": "Node 3",
      "target": "Node 3.5",
      "distance": 50
    },
    {
      "source": "Node 3",
      "target": "Node 3.6",
      "distance": 50
    },
    {
      "source": "Node 3",
      "target": "Node 3.7",
      "distance": 50
    },
    {
      "source": "Node 3",
      "target": "Node 3.8",
      "distance": 50
    },
    {
      "source": "Node 3",
      "target": "Node 3.9",
      "distance": 50
    },
    {
      "source": "Node 3",
      "target": "Node 3.10",
      "distance": 50
    },
    {
      "source": "Node 3",
      "target": "Node 3.11",
      "distance": 50
    },
    {
      "source": "Node 0",
      "target": "Node 4",
      "distance": 80
    },
    {
      "source": "Node 4",
      "target": "Node 4.0",
      "distance": 50
    },
    {
      "source": "Node 4",
      "target": "Node 4.1",
      "distance": 50
    },
    {
      "source": "Node 4",
      "target": "Node 4.2",
      "distance": 50
    },
    {
      "source": "Node 4",
      "target": "Node 4.3",
      "distance": 50
    },
    {
      "source": "Node 4",
      "target": "Node 4.4",
      "distance": 50
    },
    {
      "source": "Node 4",
      "target": "Node 4.5",
      "distance": 50
    },
    {
      "source": "Node 4",
      "target": "Node 4.6",
      "distance": 50
    },
    {
      "source": "Node 4",
      "target": "Node 4.7",
      "distance": 50
    },
    {
      "source": "Node 4",
      "target": "Node 4.8",
      "distance": 50
    },
    {
      "source": "Node 4",
      "target": "Node 4.9",
      "distance": 50
    },
    {
      "source": "Node 4",
      "target": "Node 4.10",
      "distance": 50
    },
    {
      "source": "Node 4",
      "target": "Node 4.11",
      "distance": 50
    },
    {
      "source": "Node 0",
      "target": "Node 5",
      "distance": 80
    },
    {
      "source": "Node 5",
      "target": "Node 7",
      "distance": 80
    },
    {
      "source": "Node 5",
      "target": "Node 5.0",
      "distance": 50
    },
    {
      "source": "Node 5",
      "target": "Node 5.1",
      "distance": 50
    },
    {
      "source": "Node 5",
      "target": "Node 5.2",
      "distance": 50
    },
    {
      "source": "Node 5",
      "target": "Node 5.3",
      "distance": 50
    },
    {
      "source": "Node 5",
      "target": "Node 5.4",
      "distance": 50
    },
    {
      "source": "Node 5",
      "target": "Node 5.5",
      "distance": 50
    },
    {
      "source": "Node 5",
      "target": "Node 5.6",
      "distance": 50
    },
    {
      "source": "Node 0",
      "target": "Node 6",
      "distance": 80
    },
    {
      "source": "Node 6",
      "target": "Node 6",
      "distance": 80
    },
    {
      "source": "Node 6",
      "target": "Node 11",
      "distance": 80
    },
    {
      "source": "Node 6",
      "target": "Node 6.0",
      "distance": 50
    },
    {
      "source": "Node 6",
      "target": "Node 6.1",
      "distance": 50
    },
    {
      "source": "Node 6",
      "target": "Node 6.2",
      "distance": 50
    },
    {
      "source": "Node 6",
      "target": "Node 6.3",
      "distance": 50
    },
    {
      "source": "Node 6",
      "target": "Node 6.4",
      "distance": 50
    },
    {
      "source": "Node 6",
      "target": "Node 6.5",
      "distance": 50
    },
    {
      "source": "Node 6",
      "target": "Node 6.6",
      "distance": 50
    },
    {
      "source": "Node 6",
      "target": "Node 6.7",
      "distance": 50
    },
    {
      "source": "Node 6",
      "target": "Node 6.8",
      "distance": 50
    },
    {
      "source": "Node 6",
      "target": "Node 6.9",
      "distance": 50
    },
    {
      "source": "Node 6",
      "target": "Node 6.10",
      "distance": 50
    },
    {
      "source": "Node 6",
      "target": "Node 6.11",
      "distance": 50
    },
    {
      "source": "Node 0",
      "target": "Node 7",
      "distance": 80
    },
    {
      "source": "Node 7",
      "target": "Node 7.0",
      "distance": 50
    },
    {
      "source": "Node 7",
      "target": "Node 7.1",
      "distance": 50
    },
    {
      "source": "Node 7",
      "target": "Node 7.2",
      "distance": 50
    },
    {
      "source": "Node 7",
      "target": "Node 7.3",
      "distance": 50
    },
    {
      "source": "Node 7",
      "target": "Node 7.4",
      "distance": 50
    },
    {
      "source": "Node 7",
      "target": "Node 7.5",
      "distance": 50
    },
    {
      "source": "Node 7",
      "target": "Node 7.6",
      "distance": 50
    },
    {
      "source": "Node 0",
      "target": "Node 8",
      "distance": 80
    },
    {
      "source": "Node 8",
      "target": "Node 14",
      "distance": 80
    },
    {
      "source": "Node 8",
      "target": "Node 8.0",
      "distance": 50
    },
    {
      "source": "Node 8",
      "target": "Node 8.1",
      "distance": 50
    },
    {
      "source": "Node 8",
      "target": "Node 8.2",
      "distance": 50
    },
    {
      "source": "Node 8",
      "target": "Node 8.3",
      "distance": 50
    },
    {
      "source": "Node 8",
      "target": "Node 8.4",
      "distance": 50
    },
    {
      "source": "Node 8",
      "target": "Node 8.5",
      "distance": 50
    },
    {
      "source": "Node 8",
      "target": "Node 8.6",
      "distance": 50
    },
    {
      "source": "Node 8",
      "target": "Node 8.7",
      "distance": 50
    },
    {
      "source": "Node 8",
      "target": "Node 8.8",
      "distance": 50
    },
    {
      "source": "Node 8",
      "target": "Node 8.9",
      "distance": 50
    },
    {
      "source": "Node 0",
      "target": "Node 9",
      "distance": 80
    },
    {
      "source": "Node 9",
      "target": "Node 1",
      "distance": 80
    },
    {
      "source": "Node 9",
      "target": "Node 6",
      "distance": 80
    },
    {
      "source": "Node 9",
      "target": "Node 9.0",
      "distance": 50
    },
    {
      "source": "Node 9",
      "target": "Node 9.1",
      "distance": 50
    },
    {
      "source": "Node 9",
      "target": "Node 9.2",
      "distance": 50
    },
    {
      "source": "Node 9",
      "target": "Node 9.3",
      "distance": 50
    },
    {
      "source": "Node 9",
      "target": "Node 9.4",
      "distance": 50
    },
    {
      "source": "Node 9",
      "target": "Node 9.5",
      "distance": 50
    },
    {
      "source": "Node 9",
      "target": "Node 9.6",
      "distance": 50
    },
    {
      "source": "Node 0",
      "target": "Node 10",
      "distance": 80
    },
    {
      "source": "Node 10",
      "target": "Node 10.0",
      "distance": 50
    },
    {
      "source": "Node 10",
      "target": "Node 10.1",
      "distance": 50
    },
    {
      "source": "Node 10",
      "target": "Node 10.2",
      "distance": 50
    },
    {
      "source": "Node 10",
      "target": "Node 10.3",
      "distance": 50
    },
    {
      "source": "Node 10",
      "target": "Node 10.4",
      "distance": 50
    },
    {
      "source": "Node 10",
      "target": "Node 10.5",
      "distance": 50
    },
    {
      "source": "Node 10",
      "target": "Node 10.6",
      "distance": 50
    },
    {
      "source": "Node 0",
      "target": "Node 11",
      "distance": 80
    },
    {
      "source": "Node 11",
      "target": "Node 11.0",
      "distance": 50
    },
    {
      "source": "Node 11",
      "target": "Node 11.1",
      "distance": 50
    },
    {
      "source": "Node 11",
      "target": "Node 11.2",
      "distance": 50
    },
    {
      "source": "Node 11",
      "target": "Node 11.3",
      "distance": 50
    },
    {
      "source": "Node 11",
      "target": "Node 11.4",
      "distance": 50
    },
    {
      "source": "Node 11",
      "target": "Node 11.5",
      "distance": 50
    },
    {
      "source": "Node 11",
      "target": "Node 11.6",
      "distance": 50
    },
    {
      "source": "Node 0",
      "target": "Node 12",
      "distance": 80
    },
    {
      "source": "Node 12",
      "target": "Node 12.0",
      "distance": 50
    },
    {
      "source": "Node 12",
      "target": "Node 12.1",
      "distance": 50
    },
    {
      "source": "Node 12",
      "target": "Node 12.2",
      "distance": 50
    },
    {
      "source": "Node 12",
      "target": "Node 12.3",
      "distance": 50
    },
    {
      "source": "Node 12",
      "target": "Node 12.4",
      "distance": 50
    },
    {
      "source": "Node 12",
      "target": "Node 12.5",
      "distance": 50
    },
    {
      "source": "Node 12",
      "target": "Node 12.6",
      "distance": 50
    },
    {
      "source": "Node 12",
      "target": "Node 12.7",
      "distance": 50
    },
    {
      "source": "Node 12",
      "target": "Node 12.8",
      "distance": 50
    },
    {
      "source": "Node 12",
      "target": "Node 12.9",
      "distance": 50
    },
    {
      "source": "Node 0",
      "target": "Node 13",
      "distance": 80
    },
    {
      "source": "Node 13",
      "target": "Node 13.0",
      "distance": 50
    },
    {
      "source": "Node 13",
      "target": "Node 13.1",
      "distance": 50
    },
    {
      "source": "Node 13",
      "target": "Node 13.2",
      "distance": 50
    },
    {
      "source": "Node 13",
      "target": "Node 13.3",
      "distance": 50
    },
    {
      "source": "Node 13",
      "target": "Node 13.4",
      "distance": 50
    },
    {
      "source": "Node 13",
      "target": "Node 13.5",
      "distance": 50
    },
    {
      "source": "Node 13",
      "target": "Node 13.6",
      "distance": 50
    },
    {
      "source": "Node 13",
      "target": "Node 13.7",
      "distance": 50
    },
    {
      "source": "Node 13",
      "target": "Node 13.8",
      "distance": 50
    },
    {
      "source": "Node 13",
      "target": "Node 13.9",
      "distance": 50
    },
    {
      "source": "Node 13",
      "target": "Node 13.10",
      "distance": 50
    },
    {
      "source": "Node 0",
      "target": "Node 14",
      "distance": 80
    },
    {
      "source": "Node 14",
      "target": "Node 5",
      "distance": 80
    },
    {
      "source": "Node 14",
      "target": "Node 14.0",
      "distance": 50
    },
    {
      "source": "Node 14",
      "target": "Node 14.1",
      "distance": 50
    },
    {
      "source": "Node 14",
      "target": "Node 14.2",
      "distance": 50
    },
    {
      "source": "Node 14",
      "target": "Node 14.3",
      "distance": 50
    },
    {
      "source": "Node 14",
      "target": "Node 14.4",
      "distance": 50
    },
    {
      "source": "Node 14",
      "target": "Node 14.5",
      "distance": 50
    },
    {
      "source": "Node 14",
      "target": "Node 14.6",
      "distance": 50
    },
    {
      "source": "Node 14",
      "target": "Node 14.7",
      "distance": 50
    },
    {
      "source": "Node 14",
      "target": "Node 14.8",
      "distance": 50
    },
    {
      "source": "Node 14",
      "target": "Node 14.9",
      "distance": 50
    },
    {
      "source": "Node 14",
      "target": "Node 14.10",
      "distance": 50
    },
    {
      "source": "Node 14",
      "target": "Node 14.11",
      "distance": 50
    },
    {
      "source": "Node 0",
      "target": "Node 15",
      "distance": 80
    },
    {
      "source": "Node 15",
      "target": "Node 15.0",
      "distance": 50
    },
    {
      "source": "Node 15",
      "target": "Node 15.1",
      "distance": 50
    },
    {
      "source": "Node 15",
      "target": "Node 15.2",
      "distance": 50
    },
    {
      "source": "Node 15",
      "target": "Node 15.3",
      "distance": 50
    },
    {
      "source": "Node 15",
      "target": "Node 15.4",
      "distance": 50
    },
    {
      "source": "Node 15",
      "target": "Node 15.5",
      "distance": 50
    },
    {
      "source": "Node 15",
      "target": "Node 15.6",
      "distance": 50
    },
    {
      "source": "Node 15",
      "target": "Node 15.7",
      "distance": 50
    }
  ]
  }

  var newnode = true;
     
  /*  const fetchData = async () => {
        try {
         
          const response = await fetch(`http://localhost:5154/api/graphData`);
          const result = await response.json();
          data = await result;
    
        } catch (error) {
          console.error("Error fetching data:", error);
        }   
            for (var i = 0; i < await data.length; i++){
              var graphData = await data[i];

              for (var j = 0; j < await graphData.authors.length; j++){               
                newnode = true;
              
                for(var k = 0; k < nodes.length; k++)
                  if(nodes[k].id === await graphData.authors[j].id)
                    newnode = false;
                      
                
                if(newnode){           
                   for (var l = 0; l < await nodes.length; l++){
                    const new_link = {
                      source: nodes[l].id,
                      target: await graphData.authors[j].id,
                      value: 1,
                    }
                    links.push(await new_link);
                  }
                  nodes.push(await graphData.authors[j]);
                }
                else{
                  links.forEach(async (element) =>{
                    if(((element.target ===await graphData.authors[j].id && element.source ===nodes[l].id)) || ((element.target ===nodes[l].id) && element.source ===await graphData.authors[j].id))
                      element.value++;
                  })
            }
          }
        }
        console.log(nodes);
        console.log(links);
      };

    useEffect(() => {
      fetchData();

      
    }, []);
*/

      return (
        <>
        <h3>Papers de {id}  </h3>              
              <div className="graph-cont">
              <ResponsiveNetwork 
                data={data2} 
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                linkDistance={e=>e.distance}
                centeringStrength={0.3}
                repulsivity={6}
                nodeSize={n=>n.size}
                activeNodeSize={n=>1.5*n.size}
                nodeColor={e=>e.color}
                nodeBorderWidth={1}
                nodeBorderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.8
                        ]
                    ]
                }}
                linkThickness={n=>2+2*n.target.data.height}
                linkBlendMode="multiply"
                motionConfig="wobbly"
             ></ResponsiveNetwork>
              </div>
        </>
      );
  }
  
  export default GraphData;
  //https://nivo.rocks/network/