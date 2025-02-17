import { createComponent, getTitle } from '../../.storybook/templates';
import { includesauthorshtml as component } from '../../.storybook/generatedIncludes';

const options = getTitle({
  title: 'Authors',
});

export default {
  ...options,
};

const Template = (args) => createComponent(args, component);

export const WithLink = Template.bind({});

WithLink.args = {
  authors: ['Author Name', 'Second Author'],
};

export const WithoutLink = Template.bind({});

WithoutLink.args = {
  authors: ['Author Name', 'Second Author'],
  noLink: true,
};

export const SingleName = Template.bind({});

SingleName.args = {
  authors: 'Author',
  noLink: true,
}


