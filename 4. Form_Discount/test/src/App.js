import React, { useState, useCallback, useEffect } from 'react'
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
  BlockStack, InlineGrid, FormLayout, Icon, InlineStack
} from '@shopify/polaris';
import { DeleteIcon, PlusCircleIcon, SaveIcon } from '@shopify/polaris-icons';
import '@shopify/polaris/build/esm/styles.css';
import { useForm } from 'react-hook-form';
import './App.css'
function App() {
  // general
  const [generalFormData, setFormData] = useState({
    campaign: '',
    title: '',
    description: '',
  });
  const handleGeneralChange = (field) => (value) => {
    setFormData({
      ...generalFormData,
      [field]: value // Cập nhật giá trị cho trường cụ thể
    });
  };
  // option
  const [option, setOption] = useState('option1');
  const [selected1, setSelected] = useState('0');
  const [selected2, setSelected2] = useState('2');
  const options = [
    { label: '% discount', value: '2' },
    { label: 'Discount / each', value: '1' },
    { label: 'None', value: '0' },
  ];

  var [OptionData, setOptionData] = useState([
    {
      row: 1,
      title: "Single",
      subtitle: "Standard Price",
      lable: '',
      quantity: 1,
      discountType: 0,
      amount: 0
    },
    {
      row: 2,
      title: "Duo",
      subtitle: "Save 10%",
      lable: 'Popular',
      quantity: 2,
      discountType: 2,
      amount: 10
    },
  ]);
  //preview
  const rows = [
    ['Single', 'None', '1', ''],
    ['Duo', '%discount', '2', '10%'],
  ];
  // add option

  const [cards, setCards] = useState([]);
  const BuildCard = (data) => {
    return <BlockStack key={data.row}>
      <Divider borderColor="border" />
      <Bleed marginInline="400">
        <Box
          style={{
            backgroundColor: '#FF4500',
            color: 'white',
            width: '80px',
            borderBottomRightRadius: '5px',
          }}><p class="t-option">OPTION {data.row}</p>
        </Box>
      </Bleed>
      <LegacyCard.Section
        wrap={false} alignment="leading" spacing="loose"
        actions={[{ content: <Button icon={DeleteIcon} onClick={() => handleRemoveCard(data.row)} accessibilityLabel="Delete" /> }]}
      >
        <FormLayout.Group condensed>
          <TextField
            label="Title"
            value={data.title}
          />
          <TextField
            label="Subtitle"
            value={data.subtitle}
          />
          <TextField
            label="Label (optinal)"
            value={data.label}
            autoComplete="off"
          />
        </FormLayout.Group>
        <br></br>
        <FormLayout.Group condensed>
          <TextField
            label="Quantity"
            value={data.quantity}
          />
          <Select
            label="Discount"
            options={options}
            value={data.discountType}
          />
          {data.discountType !== 0 &&
            <TextField
              label="Amount"
              autoComplete="off"
              value={data.amount}
              suffix={data.discountType === 2 ? '%' : '$'}
            />}
        </FormLayout.Group>
      </LegacyCard.Section>
    </BlockStack>
  }

  const CardDefaul = () => {
    const newCards = OptionData.map(item => ({
      id: item.row,
      card: BuildCard(item)
    }));
    setCards([...cards, ...newCards]);
  }
  const handleAddCard = () => {
    const maxRow = OptionData.reduce((max, item) => (item.row > max ? item.row : max), OptionData[0].row);
    const maxRowItem = OptionData.filter(item => item.row === maxRow)[0];
    const NewData = {
      row: maxRowItem.row + 1,
      title: '',
      subtitle: '',
      lable: '',
      quantity: maxRowItem.quantity + 1,
      discountType: 0,
      amount: 0
    }
    setOptionData([...OptionData, NewData]);
    const newCard = BuildCard(NewData)
    setCards([...cards, { id: NewData.row, card: newCard }]); // Cập nhật state với card mới
  };
  const handleRemoveCard = (index) => {
    // Loại bỏ card ở chỉ số tương ứng
    const datas = OptionData.filter(item => item.row !== index);
    setOptionData(datas);
    const updatedCards = cards.filter(item => item.id !== index);
    setCards(updatedCards);
    console.log(cards)
  };

  useEffect(() => {
    CardDefaul();
  }, []);
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
                value={generalFormData.campaign}
                onChange={handleGeneralChange("campaign")}
                placeholder="Volume discount #2"
                autoComplete="off"
                requiredIndicator
                min={1}
              />
              <br></br>
              <TextField
                label="Title"
                value={generalFormData.title}
                onChange={handleGeneralChange("title")}
                placeholder="Buy more and save"
                autoComplete="off"
                requiredIndicator
                min={1}
              />
              <br></br>
              <TextField
                label="Description"
                value={generalFormData.description}
                onChange={handleGeneralChange("description")}
                placeholder="Apply for all products store"
                autoComplete="off"
              />
            </LegacyCard>
            <LegacyCard title={<div className="mBt">Volume discount rule</div>} sectioned>
              <BlockStack gap="800">
                {cards.map((cardObj) => (
                  <div key={cardObj.id}>
                    {cardObj.card} {/* Hiển thị card */}
                  </div>
                ))}
                <Divider borderColor="border" />
                <div onClick={() => handleAddCard(1)} className="btn-add" role="button" tabIndex={0}>
                  <InlineStack wrap={false} align="center">
                    <span aria-hidden="true">
                      <Icon source={PlusCircleIcon} />
                    </span>
                    <span> Add Option</span>
                  </InlineStack>
                </div>
                <br></br>
              </BlockStack>
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
          <Button icon={SaveIcon} tone="success" variant="primary" >Save</Button>;
        </InlineGrid>
      </Page>
    </AppProvider>
  );
}

export default App;
