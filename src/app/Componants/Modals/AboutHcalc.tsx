const AboutHcalc = () => {
  return (
    <div>
      <p className="text-lg">
        This calculator is based on Jeremy Bentham&apos;s felicific calculus
        (also known as the hedonic calculus), a method designed to quantify the
        pleasure or pain that would result from an action.
      </p>
      <h3 className="text-xl font-semibold mt-4">Who was Jeremy Bentham?</h3>
      <p className="text-lg">
        Jeremy Bentham (1748-1832) was a British philosopher, jurist, and social
        reformer. He is considered the founder of modern utilitarianism, a moral
        philosophy that argues the best action is the one that maximizes overall
        well-being or happiness for the greatest number of people.
      </p>

      <h3 className="text-xl font-semibold mt-4">7 Aspects</h3>

      <ul>
        <li>
          <p>
            <strong>Intensity:</strong> How strong the pleasure or pain is
          </p>
        </li>
        <li>
          <p>
            <strong>Duration:</strong> How long the pleasure or pain will last
          </p>
        </li>
        <li>
          <p>
            <strong>Certainty:</strong> The probability that the pleasure or
            pain will occur
          </p>
        </li>
        <li>
          <p>
            <strong>Propinquity:</strong> How soon the pleasure or pain will be
            experienced
          </p>
        </li>
        <li>
          <p>
            <strong>Fecundity:</strong> The likelihood it will be followed by
            similar sensations
          </p>
        </li>
        <li>
          <p>
            <strong>Purity:</strong> The likelihood it won&apos;t be followed by
            opposite sensations
          </p>
        </li>
        <li>
          <p>
            <strong>Extent:</strong> The number of people affected by the
            pleasure or pain
          </p>
        </li>
      </ul>

      <h3 className="text-xl font-semibold mt-4">How to Use the Calculator</h3>
      <p>
        For each potential course of action, fill out each multiple choice
        question. The calculator will compute the total utility value to help
        you make decisions that maximize pleasure and minimize pain. The higher
        the total score, the more beneficial the action is predicted to be.
      </p>

      <p className="mt-4 text-sm italic">
        Note: While this calculator provides a framework for decision-making, it
        should be used as one of many tools in your ethical decision-making
        process. The complexity of human experience and morality cannot always
        be reduced to pure numbers.
      </p>
    </div>
  );
};

export default AboutHcalc;
