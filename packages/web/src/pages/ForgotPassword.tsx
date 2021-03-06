import React, { useState } from "react"
import gql from "graphql-tag"
import { Heading, Text, Button, Flex, Box } from "@chakra-ui/core"
import { RouteComponentProps } from "@reach/router"

import { useForgotPasswordMutation } from "../lib/graphql"
import { useForm } from "../lib/hooks/useForm"
import { Link } from "../components/shared/Link"
import { Form } from "../components/shared/Form"
import { FormError } from "../components/shared/FormError"
import { Input } from "../components/shared/Input"
import * as Yup from "yup"

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`

const ForgotSchema = Yup.object().shape<{ email: string }>({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
})

export const ForgotPassword: React.FC<RouteComponentProps> = () => {
  const form = useForm({ validationSchema: ForgotSchema })
  const [success, setSuccess] = useState<boolean>(false)
  const [forgotPassword] = useForgotPasswordMutation()

  const onSubmit = async ({ email }: { email: string }) => {
    const res = await forgotPassword({ variables: { email } })
    form.handler(res, { onSuccess: () => setSuccess(true) })
  }
  return (
    <Flex
      h="100vh"
      w="100%"
      align="center"
      justifyContent="flex-start"
      p={{ base: 10, lg: "5%" }}
      direction="column"
    >
      <Heading pb={10}>Forgot password</Heading>
      {success ? (
        <Box w={["100%", 400]}>
          <Text mb={4}>
            Password reset link has been sent, if that email has an account.
          </Text>
          <Flex justify="space-between" align="center" mt={4}>
            <Link to="/login">Login</Link>
          </Flex>
        </Box>
      ) : (
        <Box w={["100%", 400]}>
          <Form onSubmit={onSubmit} {...form}>
            <Text mb={4}>
              If your account exist, we'll email you link to reset your
              password.
            </Text>
            <Input name="email" label="Email" placeholder="user@example.com" />
            <FormError display="flex" justifyContent="flex-end" />
            <Button
              variantColor="blue"
              type="submit"
              isFullWidth
              loadingText="loading"
              isLoading={form.formState.isSubmitting}
            >
              Send me link
            </Button>
            <Flex justify="space-between" align="center" mt={4}>
              <Link to="/login">Login</Link>
            </Flex>
          </Form>
        </Box>
      )}
    </Flex>
  )
}
