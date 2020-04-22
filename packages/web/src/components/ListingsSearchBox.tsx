import React, { FC } from "react"
import {
  Box,
  Button,
  Flex,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/core/dist"
import { RouteComponentProps } from "@reach/router"
import { MdSearch } from "react-icons/all"
import { Moment } from "moment"
import { DatePickerPopover } from "./DatePicker"
import { GuestPickerPopover } from "./GuestPicker"

export const ListingsSearchBox: FC<RouteComponentProps> = () => {
  // const [date, setDate] = React.useState({start: null, end: null})
  const handleDateSelected = ({
    start,
    end,
  }: {
    start: Moment
    end: Moment
  }) => {
    console.log(start, end)
    // setDate({ start: start, end: end })
  }

  return (
    <Flex w="100%" p={8}>
      <SimpleGrid columns={4} spacing={2} w="99%">
        <Input placeholder="City address" />

        <Box>
          <DatePickerPopover handleDateSelection={handleDateSelected} />
        </Box>

        <Box>
          <GuestPickerPopover />
        </Box>

        <Button>
          <Box as={MdSearch} size="28px">
            <Text p={2}>Search</Text>
          </Box>
          <Text>Search</Text>
        </Button>
      </SimpleGrid>
    </Flex>
  )
}
