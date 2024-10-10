import React, { useState, useEffect } from 'react'
import {
  AppProvider, Page,
  Divider, Bleed, TextField,
  Button, Box,
  Scrollable,
  DataTable, Text,
  LegacyCard,
  Select,
  BlockStack, InlineGrid,
  FormLayout, Icon,
  InlineStack
} from '@shopify/polaris';
import { DeleteIcon, PlusCircleIcon, SaveIcon } from '@shopify/polaris-icons';
import '@shopify/polaris/build/esm/styles.css';
import { useForm, Controller } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import './App.css'
function App() {

  // option
  const options = [
    { label: '% discount', value: '2' },
    { label: 'Discount / each', value: '1' },
    { label: 'None', value: '0' },
  ];
  const [optionChange, setOptionChange] = useState([])
  var [OptionData, setOptionData] = useState([
    {
      row: 1,
      title: "Single",
      subtitle: "Standard Price",
      lable: '',
      quantity: 1,
      discountType: '0',
      amount: ''
    },
    {
      row: 2,
      title: "Duo",
      subtitle: "Save 10%",
      lable: 'Popular',
      quantity: 2,
      discountType: '2',
      amount: '10'
    },
  ]);
  //preview
  const rows = [
    ['Single', 'None', '1', ''],
    ['Duo', '%discount', '2', '10%'],
  ]
  // add option
  const BuildCard = (data) => {
    const updatedSchema = yup.object().shape({
      ...validationSchema.fields,
      [`TitleOption${data.row}`]: yup.string().required(`This field is required`),
      [`QuantityOption${data.row}`]: yup.string().required(`This field is required`),
      [`AmountOption${data.row}`]: yup.string().required(`This field is required`),
    });
    setValidationSchema(updatedSchema);
    return <BlockStack key={data.row}>
      <Divider borderColor="border" />
      <Bleed marginInline="400">
        <Box
          style={{
            backgroundColor: '#FF4500',
            color: 'white',
            width: '80px',
            borderBottomRightRadius: '5px',
          }}><p className="t-option">OPTION {data.row}</p>
        </Box>
      </Bleed>
      <LegacyCard.Section
        wrap={false} alignment="leading" spacing="loose"
        actions={[{ content: <Button icon={DeleteIcon} onClick={() => handleRemoveCard(data.row)} accessibilityLabel="Delete" /> }]}
      >
        <FormLayout.Group condensed>
          <Controller
            name={`TitleOption${data.row}`}
            control={control}
            defaultValue={data.title}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Title"
                value={value}
                onChange={(val) => onChange(val)}
                error={error && error.message}
              />
            )}
          />
          <Controller
            name={`SubtitleOption${data.row}`}
            control={control}
            defaultValue={data.subtitle}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Subtitle"
                value={value}
                onChange={(val) => onChange(val)}
                error={error && error.message}
              />
            )}
          />
          <Controller
            name={`LabelOption${data.row}`}
            control={control}
            defaultValue={data.lable}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Label (optinal)"
                value={value}
                onChange={(val) => onChange(val)}
                error={error && error.message}
              />
            )}
          />
        </FormLayout.Group>
        <br></br>
        <FormLayout.Group condensed>
          <Controller
            name={`QuantityOption${data.row}`}
            control={control}
            defaultValue={data.quantity}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Quantity"
                type="number"
                value={value}
                onChange={(val) => onChange(val)}
                error={error && error.message}
              />
            )}
          />
          <Controller
            name={`DiscountOption${data.row}`}
            control={control}
            defaultValue={data.discountType}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Select
                label="Discount"
                options={options}
                value={value}
                onChange={(val) => {
                  console.log(val)
                  return onChange(val)
                }}
                error={error && error.message}
              />
            )}
          />
          {data.discountType !== '0' &&
            <Controller
              name={`AmountOption${data.row}`}
              control={control}
              defaultValue={data.amount}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label="Amount"
                  value={value}
                  type="number"
                  suffix={data.discountType === 2 ? '%' : '$'}
                  onChange={(val) => onChange(val)}
                  error={error && error.message}
                />
              )}
            />}
        </FormLayout.Group>
      </LegacyCard.Section>
    </BlockStack>
  }
  const [cards, setCards] = useState([]);
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
    setCards([...cards, { id: NewData.row, card: newCard }]);
  };
  const handleRemoveCard = (index) => {
    const datas = OptionData.filter(item => item.row !== index);
    setOptionData(datas);
    const updatedCards = cards.filter(item => item.id !== index);
    setCards(updatedCards);
  };
  //load page
  useEffect(() => {
    CardDefaul();
  }, []);
  const [dataModel, setData] = useState(null);

  const [validationSchema, setValidationSchema] = useState(yup.object().shape({
    campaign: yup.string().required('Campaign is required'),
    title: yup.string().required('Title is required'),
  }));
  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    validateCriteriaMode: 'firstError'
  });
  //submit
  const onSubmit = dataModel => {
    alert(JSON.stringify(dataModel));
  };
  return (
    <AppProvider i18n={{}}>
      <Page
        backAction={{ content: 'Settings', url: '#' }}
        title="Create volume discount" >
        <form onSubmit={handleSubmit(onSubmit)}>

          <InlineGrid columns={{ xs: 1, md: "2fr 1fr" }} gap="400">
            <BlockStack>
              <LegacyCard title="General" sectioned>
                <Controller
                  name="campaign"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      label="Campaign"
                      value={value}
                      placeholder='Volume discount #2'
                      onChange={(val) => onChange(val)}
                      error={error && error.message}
                    />
                  )}
                />
                <br></br>
                <Controller
                  name="title"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      label="Title"
                      value={value}
                      placeholder='Buy more and save'
                      onChange={(val) => {
                        console.log('in change', errors)
                        return onChange(val)
                      }}
                      error={error && error.message}
                    />
                  )}
                />
                <br></br>
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      label="Description"
                      value={value}
                      placeholder='Apply for all production in store'
                      onChange={(val) => onChange(val)}
                      error={error && error.message}
                    />
                  )}
                />
              </LegacyCard>
              <LegacyCard title={<div className="mBt">Volume discount rule</div>} sectioned>
                <BlockStack gap="800">
                  {cards.map((cardObj) => (
                    <div key={cardObj.id}>
                      {cardObj.card}
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
            <Button icon={SaveIcon} tone="success" variant="primary" submit>Save</Button>
          </InlineGrid>
        </form>
      </Page>
    </AppProvider>
  );
}

export default App;
