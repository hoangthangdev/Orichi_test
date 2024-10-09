import React, { useState, useCallback } from 'react'
import {
  AppProvider, Page,
  Divider, Bleed,
  Card, TextField,
  Button, Box,
  RadioButton,
  Scrollable,
  DataTable, Text,
  LegacyCard,
  LegacyStack, Select,
  BlockStack, InlineGrid, FormLayout
} from '@shopify/polaris';
import { DeleteIcon } from '@shopify/polaris-icons';
import '@shopify/polaris/build/esm/styles.css';
import { useForm } from 'react-hook-form';
import './App.css'
function App() {
  const [campaign, setCampaign] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [option, setOption] = useState('option1');
  const rows = [
    ['Single', 'None', '1', ''],
    ['Duo', '%discount', '2', '10%'],
  ];
  const buttonText = <Button icon={DeleteIcon} accessibilityLabel="Delete" />;
  const handleAction = useCallback(() => {
    setCampaign((campaign) => "");
  }, []);
  const [selected1, setSelected] = useState('0');
  const [selected2, setSelected2] = useState('2');
  const options = [
    {label: '% discount', value: '2'},
    {label: 'Discount / each', value: '1'},
    {label: 'None', value: '0'},
  ];
  return (
    <AppProvider i18n={{}}>
      <Page
        backAction={{ content: 'Settings', url: '#' }}
        title="Create volume discount" >
        <InlineGrid columns={{ xs: 1, md: "2fr 1fr" }} gap="400">
          <BlockStack>
            <LegacyCard title="General" sectioned>
              <TextField
                label="Campaign"
                value={campaign}
                placeholder="Volume discount #2"
                autoComplete="off"
              />
              <br></br>
              <TextField
                label="Title"
                value={title}
                placeholder="Buy more and save"
                autoComplete="off"
              />
              <br></br>
              <TextField
                label="Description"
                value={description}
                placeholder="Apply for all products store"
                autoComplete="off"
              />
            </LegacyCard>
            <LegacyCard title={<div className="mBt">Volume discount rule</div>}>
              <div>
                <Divider borderColor="border-inverse" />
                <Box
                  style={{
                    backgroundColor: '#FF4500',
                    color: 'white',
                    width: '80px',
                    borderBottomRightRadius: '5px',
                  }}><p padding="4">OPTION 1</p></Box>
                <LegacyCard.Section
                  wrap={false} alignment="leading" spacing="loose"
                  actions={[{ content: buttonText }]}
                >
                  <FormLayout.Group condensed>
                    <TextField
                      label="Title"
                    />
                    <TextField
                      label="Subtitle"
                    />
                    <TextField
                      label="Label (optinal)"
                      autoComplete="off"
                    />
                  </FormLayout.Group>
                  <br></br>
                  <FormLayout.Group condensed>
                    <TextField
                      label="Quantity"
                    />
                    <Select
                      label="Discount"
                      options={options}
                      value={selected1}
                    />
                    <TextField
                      label="Amount"
                      autoComplete="off"
                    />
                  </FormLayout.Group>
                  <br></br>
                </LegacyCard.Section>
              </div>
              <div>
                <Divider borderColor="border-inverse" />
                <Box
                  style={{
                    backgroundColor: '#FF4500',
                    color: 'white',
                    width: '80px',
                    borderBottomRightRadius: '5px',
                  }}><p padding="4">OPTION 1</p></Box>
                <LegacyCard.Section
                  wrap={false} alignment="leading" spacing="loose"
                  actions={[{ content: buttonText }]}
                >
                  <FormLayout.Group condensed>
                    <TextField
                      label="Title"
                    />
                    <TextField
                      label="Subtitle"
                    />
                    <TextField
                      label="Label (optinal)"
                      autoComplete="off"
                    />
                  </FormLayout.Group>
                  <br></br>
                  <FormLayout.Group condensed>
                    <TextField
                      label="Quantity"
                    />
                    <Select
                      label="Discount"
                      options={options}
                      value={selected2}
                    />
                    <TextField
                      label="Amount"
                      autoComplete="off"
                    />
                  </FormLayout.Group>
                </LegacyCard.Section>
              </div>
            </LegacyCard>
          </BlockStack>
          <BlockStack gap={{ xs: "200", md: "200" }}>
            <LegacyCard title="Preview" sectioned>
              <Box padding="400" >
                <Text fontWeight="bold" alignment="center">Buy more and save</Text>
              </Box>
              <p>Apply for all products in store</p>
              <Scrollable style={{ width: '300px' }}>
                <DataTable
                  columnContentTypes={['text', 'text', 'numeric', 'text']}
                  headings={['Title', 'Discount Type', 'Quantity', 'Amount']}
                  rows={rows}
                />
              </Scrollable>
            </LegacyCard>
          </BlockStack>
        </InlineGrid>
      </Page>
    </AppProvider>
  );
}

export default App;
