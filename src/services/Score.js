class ScoreService {
  static getScore = (eid, answer) => {
    let score;
    switch (eid) {
      case "60110fd3421fe53289ea520e":
        score = this.scoreEmpathyVideo(answer);
        break;
      case "60118c562616f8066b258a21":
        score = this.scoreMusicEmotionPerception(answer);
        break;
      case "6011ad4f8935a400179cf30d":
        score = this.scoreEggDrop(answer);
        break;
      case "601a504023a1290017a28a3a":
        score = this.scoreMatrixReasoning(answer);
        break;
      default:
        score = "NA";
        break;
    }
    return score;
  }

  static scoreEmpathyVideo = (answer) => {
    // TODO: to be implemented
    return "TBI";
  }

  static scoreMusicEmotionPerception = (answer) => {
    let score = 0;

    if (answer.mep1 === '2' || answer.mep1 === '4') score += 1;
    if (answer.mep2 === '1') score += 1;
    if (answer.mep3 === '3') score += 1;
    if (answer.mep4 === '2' || answer.mep4 === '4') score += 1;

    return score;
  }

  static scoreEggDrop(answer) {
    // TODO: to be implemented
    return "TBI";
  }

  static scoreMatrixReasoning(answer) {
    // TODO: to be implemented
    return "TBI";
  }
}

export default ScoreService;
