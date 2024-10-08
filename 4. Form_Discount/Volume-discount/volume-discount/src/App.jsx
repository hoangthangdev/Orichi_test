import { useState } from 'react'
import { AppProvider, Page, Card, TextField, Button, Stack, RadioButton } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import { useForm } from 'react-hook-form';
import './App.css'

function App() {
    const { register, handleSubmit } = useForm();
    const [campaign, setCampaign] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [option, setOption] = useState('option1');
    return (
        <AppProvider i18n={{}}>
            <div>123</div>

            <Page title="Create volume discount">
                <Card sectioned title="General">
                    <Stack vertical>
                        <TextField
                            label="Campaign"
                            value={campaign}
                            onChange={(value) => setCampaign(value)}
                        />
                        <TextField
                            label="Title"
                            value={title}
                            onChange={(value) => setTitle(value)}
                        />
                        <TextField
                            label="Description"
                            value={description}
                            onChange={(value) => setDescription(value)}
                        />
                    </Stack>
                </Card>

                <Card sectioned title="Volume discount rule">
                    <Stack vertical>
                        <div>
                            <RadioButton
                                label="Option 1"
                                checked={option === 'option1'}
                                onChange={() => setOption('option1')}
                            />
                            <Stack vertical spacing="tight">
                                <TextField label="Title" placeholder="Single" />
                                <TextField label="Subtitle" placeholder="Standard price" />
                                <TextField label="Quantity" type="number" placeholder="1" />
                                <TextField label="Discount type" placeholder="None" />
                            </Stack>
                        </div>

                        <div>
                            <RadioButton
                                label="Option 2"
                                checked={option === 'option2'}
                                onChange={() => setOption('option2')}
                            />
                            <Stack vertical spacing="tight">
                                <TextField label="Title" placeholder="Duo" />
                                <TextField label="Subtitle" placeholder="Save 10%" />
                                <TextField label="Quantity" type="number" placeholder="2" />
                                <TextField label="Discount type" placeholder="% discount" />
                                <TextField label="Amount" placeholder="10" />
                            </Stack>
                        </div>
                    </Stack>
                </Card>

                <Card sectioned title="Preview">
                    <h2>{title}</h2>
                    <p>Apply for all products in store</p>
                    <p>Discount Type: {option === 'option1' ? 'None' : '% discount'}</p>
                    <p>Quantity: {option === 'option1' ? '1' : '2'}</p>
                    <p>Amount: {option === 'option2' ? '10%' : 'N/A'}</p>
                </Card>

                <Button primary submit>Save</Button>
            </Page>
        </AppProvider>
    )
}

export default App
