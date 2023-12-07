import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text, Divider, ButtonGroup, Button } from '@chakra-ui/react'

export default function FeedCard() {
    return (
        <Card >
            <CardBody>
                <h1 className="text-xl font-semibold">
                    Title
                </h1>
                <p className="text-sm">
                    Description
                </p>
                <p className="text-right text-md">
                    0.5 ETH
                </p>
                <div className="flex justify-end gap-2">
                    <Button variant="bordered" color="primary">
                        Message
                    </Button>
                    <Button color="primary" >
                        Order
                    </Button>
                </div>
            </CardBody>
        </Card>
    )
}