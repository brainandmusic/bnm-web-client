/*eslint no-undef: "off"*/

// Define the experiment
const str = "{\n  \"title\": \"root\",\n  \"type\": \"lab.flow.Sequence\",\n  \"parameters\": {},\n  \"plugins\": [\n    {\n      \"type\": \"lab.plugins.Metadata\"\n    }\n  ],\n  \"metadata\": {\n    \"title\": \"\",\n    \"description\": \"\",\n    \"repository\": \"\",\n    \"contributors\": \"\"\n  },\n  \"files\": {},\n  \"responses\": {},\n  \"content\": [\n    {\n      \"type\": \"lab.canvas.Screen\",\n      \"content\": [\n        {\n          \"type\": \"i-text\",\n          \"left\": 0,\n          \"top\": 0,\n          \"angle\": 0,\n          \"width\": 58.7,\n          \"height\": 36.16,\n          \"stroke\": null,\n          \"strokeWidth\": 1,\n          \"fill\": \"#d6341a\",\n          \"text\": \"Red\",\n          \"fontStyle\": \"normal\",\n          \"fontWeight\": \"normal\",\n          \"fontSize\": 32,\n          \"fontFamily\": \"sans-serif\",\n          \"lineHeight\": 1.16,\n          \"textAlign\": \"center\"\n        }\n      ],\n      \"viewport\": [\n        800,\n        600\n      ],\n      \"files\": {},\n      \"responses\": {\n        \"\": \"\"\n      },\n      \"parameters\": {},\n      \"messageHandlers\": {},\n      \"title\": \"Red Screen\"\n    }\n  ]\n}"
const experiment = lab.util.fromObject(JSON.parse(str));

// Start the experiment
experiment.run()
