// Mapa del recorrido virtual del museo
// Sistema de navegación: 4 botones (prev/next en sala, prev/next sala)
export const museumMap = [
  {
    id: "G0041653",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0041653.JPG`,
    title: "Frente del Museo - Vista 1",
    room: 0,
    hotspots: [
      {
        targetId: "G0041654",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0041654",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0041654.JPG`,
    title: "Frente del Museo - Vista 2",
    room: 0,
    hotspots: [
      {
        targetId: "G0041653",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0041655",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0041655",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0041655.JPG`,
    title: "Frente del Museo - Vista 3",
    room: 0,
    hotspots: [
      {
        targetId: "G0041654",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0041656",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0041656",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0041656.JPG`,
    title: "Frente del Museo - Vista 4",
    room: 0,
    hotspots: [
      {
        targetId: "G0041655",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0041657",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0041657",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0041657.JPG`,
    title: "Frente del Museo - Vista 5",
    room: 0,
    hotspots: [
      {
        targetId: "G0041656",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0041658",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0041658",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0041658.JPG`,
    title: "Frente del Museo - Vista 6",
    room: 0,
    hotspots: [
      {
        targetId: "G0041657",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0041659",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0041659",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0041659.JPG`,
    title: "Frente del Museo - Vista 7",
    room: 0,
    hotspots: [
      {
        targetId: "G0041658",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0041660",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0041660",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0041660.JPG`,
    title: "Frente del Museo - Vista 8",
    room: 0,
    hotspots: [
      {
        targetId: "G0041659",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0041661",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0041661",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0041661.JPG`,
    title: "Frente del Museo - Vista 9",
    room: 0,
    hotspots: [
      {
        targetId: "G0041660",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0041662",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0041662",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0041662.JPG`,
    title: "Frente del Museo - Vista 10",
    room: 0,
    hotspots: [
      {
        targetId: "G0041661",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0051664",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0051664",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0051664.JPG`,
    title: "Frente del Museo - Vista 11",
    room: 0,
    hotspots: [
      {
        targetId: "G0041662",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0051665",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0051665",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0051665.JPG`,
    title: "Frente del Museo - Vista 12",
    room: 0,
    hotspots: [
      {
        targetId: "G0051664",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0051666",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0051666",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0051666.JPG`,
    title: "Frente del Museo - Vista 13",
    room: 0,
    hotspots: [
      {
        targetId: "G0051665",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0051667",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0051667",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0051667.JPG`,
    title: "Frente del Museo - Vista 14",
    room: 0,
    hotspots: [
      {
        targetId: "G0051666",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0051668",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0051668",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0051668.JPG`,
    title: "Frente del Museo - Vista 15",
    room: 0,
    hotspots: [
      {
        targetId: "G0051667",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0051669",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0051669",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0051669.JPG`,
    title: "Frente del Museo - Vista 16",
    room: 0,
    hotspots: [
      {
        targetId: "G0051668",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0051670",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0051670",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0051670.JPG`,
    title: "Frente del Museo - Vista 17",
    room: 0,
    hotspots: [
      {
        targetId: "G0051669",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0051671",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0051671",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0051671.JPG`,
    title: "Frente del Museo - Vista 18",
    room: 0,
    hotspots: [
      {
        targetId: "G0051670",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0011623",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0011623",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0011623.JPG`,
    title: "Frente del Museo - Vista 19",
    room: 0,
    hotspots: [
      {
        targetId: "G0051671",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0011624",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0011624",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0011624.JPG`,
    title: "Sala 2 - Vista 1",
    room: 1,
    hotspots: [
      {
        targetId: "G0011625",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0011625",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0011625.JPG`,
    title: "Sala 2 - Vista 2",
    room: 1,
    hotspots: [
      {
        targetId: "G0011624",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0011626",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0011626",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0011626.JPG`,
    title: "Sala 2 - Vista 3",
    room: 1,
    hotspots: [
      {
        targetId: "G0011625",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0011627",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0011627",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0011627.JPG`,
    title: "Sala 2 - Vista 4",
    room: 1,
    hotspots: [
      {
        targetId: "G0011626",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0011628",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0011628",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0011628.JPG`,
    title: "Sala 2 - Vista 5",
    room: 1,
    hotspots: [
      {
        targetId: "G0011627",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0011629",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0011629",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0011629.JPG`,
    title: "Sala 2 - Vista 6",
    room: 1,
    hotspots: [
      {
        targetId: "G0011628",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0011630",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0011630",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0011630.JPG`,
    title: "Sala 2 - Vista 7",
    room: 1,
    hotspots: [
      {
        targetId: "G0011629",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0021632",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0021632",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0021632.JPG`,
    title: "Sala 2 - Vista 8",
    room: 1,
    hotspots: [
      {
        targetId: "G0011630",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0021633",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0021633",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0021633.JPG`,
    title: "Sala 2 - Vista 9",
    room: 1,
    hotspots: [
      {
        targetId: "G0021632",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0021634",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0021634",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0021634.JPG`,
    title: "Sala 2 - Vista 10",
    room: 1,
    hotspots: [
      {
        targetId: "G0021633",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0021635",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0021635",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0021635.JPG`,
    title: "Sala 2 - Vista 11",
    room: 1,
    hotspots: [
      {
        targetId: "G0021634",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0021636",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0021636",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0021636.JPG`,
    title: "Sala 2 - Vista 12",
    room: 1,
    hotspots: [
      {
        targetId: "G0021635",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0021637",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0021637",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0021637.JPG`,
    title: "Sala 2 - Vista 13",
    room: 1,
    hotspots: [
      {
        targetId: "G0021636",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0021638",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0021638",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0021638.JPG`,
    title: "Sala 2 - Vista 14",
    room: 1,
    hotspots: [
      {
        targetId: "G0021637",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0021639",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0021639",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0021639.JPG`,
    title: "Sala 2 - Vista 15",
    room: 1,
    hotspots: [
      {
        targetId: "G0021638",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0021640",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0021640",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0021640.JPG`,
    title: "Sala 2 - Vista 16",
    room: 1,
    hotspots: [
      {
        targetId: "G0021639",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0021641",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0021641",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0021641.JPG`,
    title: "Sala 2 - Vista 17",
    room: 1,
    hotspots: [
      {
        targetId: "G0021640",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0031644",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0031644",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0031644.JPG`,
    title: "Sala 2 - Vista 18",
    room: 1,
    hotspots: [
      {
        targetId: "G0021641",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0031645",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0031645",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0031645.JPG`,
    title: "Sala 2 - Vista 19",
    room: 1,
    hotspots: [
      {
        targetId: "G0031644",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0031646",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0031646",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0031646.JPG`,
    title: "Sala 2 - Vista 20",
    room: 1,
    hotspots: [
      {
        targetId: "G0031645",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0061673",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0061673",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0061673.JPG`,
    title: "Sala 2 - Vista 21",
    room: 1,
    hotspots: [
      {
        targetId: "G0031646",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0061674",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0061674",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0061674.JPG`,
    title: "Sala 2 - Vista 22",
    room: 1,
    hotspots: [
      {
        targetId: "G0061673",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0061675",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0061675",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0061675.JPG`,
    title: "Sala 2 - Vista 23",
    room: 1,
    hotspots: [
      {
        targetId: "G0061674",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0061676",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0061676",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0061676.JPG`,
    title: "Sala 2 - Vista 24",
    room: 1,
    hotspots: [
      {
        targetId: "G0061675",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0061677",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0061677",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0061677.JPG`,
    title: "Sala 2 - Vista 25",
    room: 1,
    hotspots: [
      {
        targetId: "G0061676",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0071679",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0071679",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0071679.JPG`,
    title: "Sala 2 - Vista 26",
    room: 1,
    hotspots: [
      {
        targetId: "G0061677",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0071680",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0071680",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0071680.JPG`,
    title: "Sala 2 - Vista 27",
    room: 1,
    hotspots: [
      {
        targetId: "G0071679",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0071681",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0071681",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0071681.JPG`,
    title: "Sala 2 - Vista 28",
    room: 1,
    hotspots: [
      {
        targetId: "G0071680",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0071682",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0071682",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0071682.JPG`,
    title: "Sala 2 - Vista 29",
    room: 1,
    hotspots: [
      {
        targetId: "G0071681",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0081684",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0081684",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0081684.JPG`,
    title: "Sala 2 - Vista 30",
    room: 1,
    hotspots: [
      {
        targetId: "G0071682",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0081685",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0081685",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0081685.JPG`,
    title: "Sala 2 - Vista 31",
    room: 1,
    hotspots: [
      {
        targetId: "G0081684",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0081686",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0081686",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0081686.JPG`,
    title: "Sala 2 - Vista 32",
    room: 1,
    hotspots: [
      {
        targetId: "G0081685",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0081687",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0081687",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0081687.JPG`,
    title: "Sala 2 - Vista 33",
    room: 1,
    hotspots: [
      {
        targetId: "G0081686",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0081688",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0081688",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0081688.JPG`,
    title: "Sala 2 - Vista 34",
    room: 1,
    hotspots: [
      {
        targetId: "G0081687",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0091690",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0091690",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0091690.JPG`,
    title: "Sala 2 - Vista 35",
    room: 1,
    hotspots: [
      {
        targetId: "G0081688",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0091691",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0091691",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0091691.JPG`,
    title: "Sala 2 - Vista 36",
    room: 1,
    hotspots: [
      {
        targetId: "G0091690",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0091692",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0091692",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0091692.JPG`,
    title: "Sala 2 - Vista 37",
    room: 1,
    hotspots: [
      {
        targetId: "G0091691",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0091693",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0091693",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0091693.JPG`,
    title: "Sala 2 - Vista 38",
    room: 1,
    hotspots: [
      {
        targetId: "G0091692",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0091694",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0091694",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0091694.JPG`,
    title: "Sala 2 - Vista 39",
    room: 1,
    hotspots: [
      {
        targetId: "G0091693",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0091695",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0091695",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0091695.JPG`,
    title: "Sala 2 - Vista 40",
    room: 1,
    hotspots: [
      {
        targetId: "G0091694",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0101697",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0101697",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0101697.JPG`,
    title: "Sala 2 - Vista 41",
    room: 1,
    hotspots: [
      {
        targetId: "G0091695",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0041653",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      },
      {
        targetId: "G0101698",
        type: "next-room",
        coords: [
          65,
          90
        ],
        icon: "next-room"
      }
    ]
  },
  {
    id: "G0101698",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0101698.JPG`,
    title: "Sala 3 - Vista 1",
    room: 2,
    hotspots: [
      {
        targetId: "G0101699",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0101699",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0101699.JPG`,
    title: "Sala 3 - Vista 2",
    room: 2,
    hotspots: [
      {
        targetId: "G0101698",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0101700",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0101700",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0101700.JPG`,
    title: "Sala 3 - Vista 3",
    room: 2,
    hotspots: [
      {
        targetId: "G0101699",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0101701",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0101701",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0101701.JPG`,
    title: "Sala 3 - Vista 4",
    room: 2,
    hotspots: [
      {
        targetId: "G0101700",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0111703",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0111703",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0111703.JPG`,
    title: "Sala 3 - Vista 5",
    room: 2,
    hotspots: [
      {
        targetId: "G0101701",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0111704",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0111704",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0111704.JPG`,
    title: "Sala 3 - Vista 6",
    room: 2,
    hotspots: [
      {
        targetId: "G0111703",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0111705",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0111705",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0111705.JPG`,
    title: "Sala 3 - Vista 7",
    room: 2,
    hotspots: [
      {
        targetId: "G0111704",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0111706",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0111706",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0111706.JPG`,
    title: "Sala 3 - Vista 8",
    room: 2,
    hotspots: [
      {
        targetId: "G0111705",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0121708",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0121708",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0121708.JPG`,
    title: "Sala 3 - Vista 9",
    room: 2,
    hotspots: [
      {
        targetId: "G0111706",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0121709",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0121709",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0121709.JPG`,
    title: "Sala 3 - Vista 10",
    room: 2,
    hotspots: [
      {
        targetId: "G0121708",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0131711",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0131711",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0131711.JPG`,
    title: "Sala 3 - Vista 11",
    room: 2,
    hotspots: [
      {
        targetId: "G0121709",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0131712",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0131712",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0131712.JPG`,
    title: "Sala 3 - Vista 12",
    room: 2,
    hotspots: [
      {
        targetId: "G0131711",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0141714",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0141714",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0141714.JPG`,
    title: "Sala 3 - Vista 13",
    room: 2,
    hotspots: [
      {
        targetId: "G0131712",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0141715",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0141715",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0141715.JPG`,
    title: "Sala 3 - Vista 14",
    room: 2,
    hotspots: [
      {
        targetId: "G0141714",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0151717",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0151717",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0151717.JPG`,
    title: "Sala 3 - Vista 15",
    room: 2,
    hotspots: [
      {
        targetId: "G0141715",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0151718",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0151718",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0151718.JPG`,
    title: "Sala 3 - Vista 16",
    room: 2,
    hotspots: [
      {
        targetId: "G0151717",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0161720",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0161720",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0161720.JPG`,
    title: "Sala 3 - Vista 17",
    room: 2,
    hotspots: [
      {
        targetId: "G0151718",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0161721",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0161721",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0161721.JPG`,
    title: "Sala 3 - Vista 18",
    room: 2,
    hotspots: [
      {
        targetId: "G0161720",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0161722",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0161722",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0161722.JPG`,
    title: "Sala 3 - Vista 19",
    room: 2,
    hotspots: [
      {
        targetId: "G0161721",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0161723",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0161723",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0161723.JPG`,
    title: "Sala 3 - Vista 20",
    room: 2,
    hotspots: [
      {
        targetId: "G0161722",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0161724",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0161724",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0161724.JPG`,
    title: "Sala 3 - Vista 21",
    room: 2,
    hotspots: [
      {
        targetId: "G0161723",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0161725",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0161725",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0161725.JPG`,
    title: "Sala 3 - Vista 22",
    room: 2,
    hotspots: [
      {
        targetId: "G0161724",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0161726",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0161726",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0161726.JPG`,
    title: "Sala 3 - Vista 23",
    room: 2,
    hotspots: [
      {
        targetId: "G0161725",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0161727",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0161727",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0161727.JPG`,
    title: "Sala 3 - Vista 24",
    room: 2,
    hotspots: [
      {
        targetId: "G0161726",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0161728",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0161728",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0161728.JPG`,
    title: "Sala 3 - Vista 25",
    room: 2,
    hotspots: [
      {
        targetId: "G0161727",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0161729",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0161729",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0161729.JPG`,
    title: "Sala 3 - Vista 26",
    room: 2,
    hotspots: [
      {
        targetId: "G0161728",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0161730",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0161730",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0161730.JPG`,
    title: "Sala 3 - Vista 27",
    room: 2,
    hotspots: [
      {
        targetId: "G0161729",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0161731",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0161731",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0161731.JPG`,
    title: "Sala 3 - Vista 28",
    room: 2,
    hotspots: [
      {
        targetId: "G0161730",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0171733",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0171733",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0171733.JPG`,
    title: "Sala 3 - Vista 29",
    room: 2,
    hotspots: [
      {
        targetId: "G0161731",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0171734",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0171734",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0171734.JPG`,
    title: "Sala 3 - Vista 30",
    room: 2,
    hotspots: [
      {
        targetId: "G0171733",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0171735",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0171735",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0171735.JPG`,
    title: "Sala 3 - Vista 31",
    room: 2,
    hotspots: [
      {
        targetId: "G0171734",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0171736",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0171736",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0171736.JPG`,
    title: "Sala 3 - Vista 32",
    room: 2,
    hotspots: [
      {
        targetId: "G0171735",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0171737",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0171737",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0171737.JPG`,
    title: "Sala 3 - Vista 33",
    room: 2,
    hotspots: [
      {
        targetId: "G0171736",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0171738",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0171738",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0171738.JPG`,
    title: "Sala 3 - Vista 34",
    room: 2,
    hotspots: [
      {
        targetId: "G0171737",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0181740",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0181740",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0181740.JPG`,
    title: "Sala 3 - Vista 35",
    room: 2,
    hotspots: [
      {
        targetId: "G0171738",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0181741",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0181741",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0181741.JPG`,
    title: "Sala 3 - Vista 36",
    room: 2,
    hotspots: [
      {
        targetId: "G0181740",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0181742",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0181742",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0181742.JPG`,
    title: "Sala 3 - Vista 37",
    room: 2,
    hotspots: [
      {
        targetId: "G0181741",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0181743",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0181743",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0181743.JPG`,
    title: "Sala 3 - Vista 38",
    room: 2,
    hotspots: [
      {
        targetId: "G0181742",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0181744",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0181744",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0181744.JPG`,
    title: "Sala 3 - Vista 39",
    room: 2,
    hotspots: [
      {
        targetId: "G0181743",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0181745",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0181745",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0181745.JPG`,
    title: "Sala 3 - Vista 40",
    room: 2,
    hotspots: [
      {
        targetId: "G0181744",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0191747",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0191747",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0191747.JPG`,
    title: "Sala 3 - Vista 41",
    room: 2,
    hotspots: [
      {
        targetId: "G0181745",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0201749",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0201749",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0201749.JPG`,
    title: "Sala 3 - Vista 42",
    room: 2,
    hotspots: [
      {
        targetId: "G0191747",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0201750",
        type: "next-in-room",
        coords: [
          60,
          90
        ],
        icon: "next"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  },
  {
    id: "G0201750",
    src: `${import.meta.env.BASE_URL}visita-virtual/G0201750.JPG`,
    title: "Sala 3 - Vista 43",
    room: 2,
    hotspots: [
      {
        targetId: "G0201749",
        type: "prev-in-room",
        coords: [
          40,
          90
        ],
        icon: "prev"
      },
      {
        targetId: "G0011624",
        type: "prev-room",
        coords: [
          35,
          90
        ],
        icon: "prev-room"
      }
    ]
  }
];

// Configuración de salas
export const ROOM_CONFIG = [
  {
    nombre: "Frente del Museo",
    inicio: 0,
    fin: 18
  },
  {
    nombre: "Sala 2",
    inicio: 19,
    fin: 59
  },
  {
    nombre: "Sala 3",
    inicio: 60,
    fin: 102
  }
];
