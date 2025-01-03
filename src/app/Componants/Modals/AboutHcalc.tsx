import DownloadEssayBtn from "../Buttons/DownloadEssayBtn";

const AboutHcalc = () => {
  return (
    <div>
      <p className="text-lg">
        This calculator implements Jeremy Bentham&apos;s felicific calculus
        (also known as the hedonic calculus), a systematic method designed to
        evaluate the moral worth of actions by quantifying their potential to
        produce pleasure or pain. This ethical decision-making tool helps assess
        the consequences of actions based on their overall impact on well-being.
      </p>

      <h3 className="text-xl font-semibold mt-4">Who was Jeremy Bentham?</h3>
      <p className="text-lg">
        Jeremy Bentham (1748-1832) was a pioneering British philosopher, jurist,
        and social reformer. He is considered the founder of modern
        utilitarianism, a moral philosophy that argues the most ethical action
        is the one that maximizes overall well-being or happiness for the
        greatest number of people. His ideas have profoundly influenced modern
        legal systems, democratic reforms, and approaches to public policy.
      </p>

      <h3 className="text-xl font-semibold mt-4">
        The Seven Elements of the Felicific Calculus
      </h3>
      <p className="mb-2">
        Bentham proposed seven key aspects to consider when evaluating any
        action:
      </p>
      <ul className="space-y-2">
        <li>
          <p>
            <strong>Intensity:</strong> The strength or force of the pleasure or
            pain that will be experienced
          </p>
        </li>
        <li>
          <p>
            <strong>Duration:</strong> The length of time the pleasure or pain
            is expected to last
          </p>
        </li>
        <li>
          <p>
            <strong>Certainty:</strong> The probability that the predicted
            pleasure or pain will actually occur
          </p>
        </li>
        <li>
          <p>
            <strong>Propinquity (or Nearness):</strong> How soon the pleasure or
            pain will be experienced after the action
          </p>
        </li>
        <li>
          <p>
            <strong>Fecundity:</strong> The likelihood that the sensation will
            be followed by similar sensations in the future
          </p>
        </li>
        <li>
          <p>
            <strong>Purity:</strong> The likelihood that the sensation
            won&apos;t be followed by opposing sensations (e.g., pleasure
            followed by pain)
          </p>
        </li>
        <li>
          <p>
            <strong>Extent:</strong> The number of people who will be affected
            by the pleasure or pain resulting from the action
          </p>
        </li>
      </ul>

      <h3 className="text-xl font-semibold mt-6">Using the Calculator</h3>
      <p>
        To evaluate a potential action, answer each multiple choice question
        thoughtfully. The calculator will compute a total utility value based on
        Bentham&apos;s seven criteria. Higher scores indicate actions predicted
        to produce greater overall benefit. Consider evaluating multiple
        possible actions to compare their potential outcomes.
      </p>

      <div className="bg-black bg-opacity-15 p-4 rounded-lg mt-6">
        <p className="text-sm italic">
          Important Note: While this calculator provides a structured framework
          for ethical decision-making, it should be used as one of several tools
          in your moral reasoning process. Human experience and ethical
          complexity often extend beyond what can be captured in numerical
          calculations. The results should inform, but not solely determine,
          your decisions.
        </p>
      </div>

      <div className="flex justify-end items-center gap-4 mt-6">
        <p>Read Bentham&apos;s original essay on this topic:</p>
        <DownloadEssayBtn />
      </div>
    </div>
  );
};

export default AboutHcalc;
