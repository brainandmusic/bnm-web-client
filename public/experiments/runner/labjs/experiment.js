/*eslint no-undef: "off"*/

// Define the sequence of components that define the experiment
const experiment = new lab.flow.Sequence({
  content: [
    new lab.html.Screen({
      content: 'The experiment is running!',
    }),
  ],
})

// Start the experiment
experiment.run()
