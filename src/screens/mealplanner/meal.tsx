import React from 'react'
import { Card, Paragraph, Button, Caption, Title } from 'react-native-paper'
import { Rating } from 'react-native-ratings'
import { Hpane, Vpane } from 'view-on-steroids'

interface Props {
  title?: string
  mode?: string
  rating?: number
  description?: string
  image?: string
  weight?: number
  preparationTime?: number
  cookingTime?: number
}

export default ({
  title = 'Keto chicken curry stew',
  mode = 'Easy',
  description = 'Crisp, succulent asparagus, creamy goat cheese and salty prosciutto create the perfect trio of flavors. So elegant, you’ll wonder if you should have dressed up. So simple, you won’t worry about it. And so easy, you’ll make it any night of the week. This recipe is provided by our COO Bjarte, and is a popular go-to meal in his house.',
  rating = 4,
  image = 'https://i.dietdoctor.com/wp-content/uploads/2017/11/DD-544-ketochaitea-2.jpg?auto=compress%2Cformat&w=600&h=900&fit=crop',
  weight = 1,
  preparationTime = 15,
  cookingTime = 45
}: Props) => (
  <Card style={{ backgroundColor: '#fafafa', paddingBottom: 20 }}>
    {/* <Card.Title
      title={title}
      subtitle={`${preparationTime} + ${cookingTime} m | ${mode}`}
    /> */}
    <Card.Content>
      <Vpane justifyContent='flex-start'>
        <Title>{title}</Title>
        <Hpane>
          <Caption>{`${preparationTime} + ${cookingTime} m | ${mode}`}</Caption>
          <Rating
            ratingCount={rating}
            imageSize={20}
            ratingBackgroundColor='transparent'
            style={{ marginLeft: 10 } as any}
          />
        </Hpane>
      </Vpane>
      <Card.Cover source={{ uri: image }} style={{ marginVertical: 5 }} />
      <Paragraph>{description}</Paragraph>
    </Card.Content>
    <Card.Actions>
      <Button color='#6188ce'>New Suggestion</Button>
      <Button color='#6188ce'>Choose this meal</Button>
    </Card.Actions>
  </Card>
)
