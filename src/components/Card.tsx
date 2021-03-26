import * as React from 'react';
import * as XPaper from 'react-native-paper';

const LeftContent = (props: any) => <Paper.Avatar.Icon {...props} icon="folder" />
const Paper: any = XPaper;

const XCard: React.FC<any> = ({ title, subtitle }) => (
  <Paper.Card>
    <Paper.Card.Title title={title} subtitle={subtitle} left={LeftContent} />
    <Paper.Card.Content>
      <Paper.Title>Card title</Paper.Title>
      <Paper.Paragraph>Card content</Paper.Paragraph>
    </Paper.Card.Content>
    <Paper.Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Paper.Card.Actions>
      <Paper.Button>Cancel</Paper.Button>
      <Paper.Button>Ok</Paper.Button>
    </Paper.Card.Actions>
  </Paper.Card>
);

export default XCard;