import { createLanguagePerk, Species } from "./base";
import { multiline } from 'common/string';

const Ethereal: Species = {
  description: multiline`Coming from the planet of Sprout, the theocratic
  ethereals are separated socially by caste. They are organic creatures
  with bio-luminescent skin and electrically charged blood, and are known
  for their partial-immortality and bright nature.`,
  features: {
    good: [{
      icon: "bolt",
      name: "Shockingly Tasty",
      description: multiline`Ethereals can feed on electricity from APCs,
      borg chargers, lights. They can also eat food with enriched liquid
      electricity inside of it. Normal food does nothing for them though.`,
    }, {
      icon: "lightbulb",
      name: "Disco Ball",
      description: "Ethereals passively generate their own light.",
    }, {
      icon: "shield-alt",
      name: "Shock Resistance",
      description: "Ethereals are less affected by shocks.",
    }, {
      icon: "temperature-high",
      name: "Heat Resistance",
      description: multiline`Ethereals have much better tolerance for high \
        temperatures.`,
    }, createLanguagePerk("Voltaic")],
    neutral: [{
      icon: "tint",
      name: "Liquid Electricity",
      description: "Ethereals have liquid electricity instead of blood. \
        Great for them, horrid for anyone else. Can make receiving medical \
        treatment harder.",
    }, {
      icon: "fire",
      name: "Flaming Punch",
      description: "Ethereals deal burn damage when punching instead of \
        brute damage.",
    }, {
      icon: "gem",
      name: "Crystal Core",
      description: "The hearts of ethereals will protect them in a cystal when \
        they die, reviving them with a permanent brain trauma.",
    }],
    bad: [{
      icon: "biohazard",
      name: "Starving Artist",
      description: "Ethereals take toxin damage while starving.",
    }, {
      icon: "fist-raised",
      name: "Brutal Weakness",
      description: "Ethereals are weak to brute damage.",
    }, {
      icon: "temperature-low",
      name: "Cold Weakness",
      description: "Ethereals have much lower tolerance for cold temperatures.",
    }],
  },
  lore: multiline`Ethereals are a species native to the planet Sprout. When
  they were originally discovered, they were at a medieval level of
  technological progression, but due to their natural acclimation with
  electricity, they felt easy among the large NanoTrasen installations.

  Due to a hostile take-over by the millitary caste on their home planet,
  most Ethereals are refugees that fled from their home, the ones that are
  still on Sprout are working there under authoritian rule.`,
};

export default Ethereal;
