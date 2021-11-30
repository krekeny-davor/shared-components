import { createComponent } from '../../.storybook/templates';
import { includesctahtml as ctaTemplate } from '../../.storybook/generatedIncludes';

import { analytics } from '../globalArgTypes';

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export default {
  title: 'Components/Cta',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    skin: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'primary is-cutoff',
        'secondary is-cutoff',
        'primary is-cutoff is-light',
        'secondary is-cutoff is-light',
        'primary is-light',
        'secondary is-light',
      ],
    },
    analytics,
    grow: {
      defaultValue: false,
      control: { type: 'boolean' },
      description: "Will apply w-lg-auto when you don't specify a width.",
      type: {
        summary: null,
      },
    },
    width: {
      table: {
        disabled: false,
      },
      control: {
        type: 'text',
      },
      type: {
        summary: 'Bootstrap widths',
        detail: 'w-10, w-20, w-30, ... or w-lg-80, w-md-60, ...',
      },
      description: 'Here you can add helper classes for the width:',
    },
  },
};

const Template = (args) => createComponent(args, ctaTemplate);

export const PrimaryButtonCutoff = Template.bind({});

PrimaryButtonCutoff.args = {
  text: 'Primary Button Cutoff',
  href: 'javascript:void(0)',
  skin: 'primary is-cutoff',
  button: true,
};

export const SecondaryButtonCutoff = Template.bind({});

SecondaryButtonCutoff.args = {
  text: 'Secondary Button Cutoff',
  href: 'javascript:void(0)',
  skin: 'secondary is-cutoff',
};

export const PrimaryButton = Template.bind({});

PrimaryButton.args = {
  text: 'Primary Button',
  href: 'javascript:void(0)',
  skin: 'primary',
  button: true,
};

export const SecondaryButton = Template.bind({});

SecondaryButton.args = {
  text: 'Secondary Button',
  href: 'javascript:void(0)',
  skin: 'secondary',
  button: true,
};

export const PrimaryLink = Template.bind({});

PrimaryLink.args = {
  text: 'Primary Link',
  href: 'javascript:void(0)',
  link: true,
};

PrimaryLink.argTypes = {
  width: {
    table: { disable: true },
  },
  skin: {
    table: { disable: true },
  },
};
