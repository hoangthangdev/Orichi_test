import React, { useState } from 'react'
import {
  AppProvider, Page,
  Divider, Bleed, 
  Card, TextField,
  Button, Box,
  RadioButton, 
  Scrollable,
  DataTable,Text ,
  BlockStack, InlineGrid
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
  const SkeletonLabel = (props) => {
    return (
      <Box
        background="bg-fill-tertiary"
        minHeight="1rem"
        maxWidth="5rem"
        borderRadius="base"
        {...props}
      />
    );
  };
  const SkeletonDisplayText = () => {

  };
  const SkeletonBodyText = () => {

  };
  const rows = [
    ['Single', 'None', '1', ''],
    ['Duo', '%discount', '2', '10%'],
  ];
  return (
    <AppProvider i18n={{}}>
      <Page
        backAction={{ content: 'Settings', url: '#' }}
        title="Create volume discount" >

        <InlineGrid columns={{ xs: 1, md: "2fr 1fr" }} gap="400">
          <BlockStack gap="400">
            <Card roundedAbove="sm">
              <BlockStack gap="400">
                <SkeletonLabel />
                <Box border="divider" borderRadius="base" minHeight="2rem" />
                <SkeletonLabel maxWidth="8rem" />
                <Box border="divider" borderRadius="base" minHeight="20rem" />
              </BlockStack>
            </Card>
            <Card roundedAbove="sm">
              <BlockStack gap="400">
                <SkeletonDisplayText size="small" />
                <InlineGrid columns={{ xs: 1, md: 2 }}>
                  <Box border="divider" borderRadius="base" minHeight="10rem" />
                  <Box border="divider" borderRadius="base" minHeight="10rem" />
                </InlineGrid>
              </BlockStack>
            </Card>
          </BlockStack>
          <BlockStack gap={{ xs: "400", md: "200" }}>
            <Card roundedAbove="sm" title="Preview" sectioned>
              <h2>
                <Text variation="strong">Buy more and save</Text>
              </h2>
              <p>Apply for all products in store</p>

              <DataTable
                columnContentTypes={['text', 'text', 'numeric', 'text']}
                headings={['Title', 'Discount Type', 'Quantity', 'Amount']}
                rows={rows}
              />
            </Card>
          </BlockStack>
        </InlineGrid>
      </Page>
    </AppProvider>

  );
}

export default App;
