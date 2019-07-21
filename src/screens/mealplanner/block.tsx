import React, { Component } from 'react'
import { StyleSheet, FlatList, Dimensions } from 'react-native'
import {
  Card
} from 'react-native-paper'

const { width: WIDTH } = Dimensions.get('window')
interface Item {
  title: string
  image: string
}
interface RenderItem {
  item: Item
}
interface Props {
  title?: string
  description?: string
  onPress?: (id: string) => void
  items?: Item[]
}
class Block extends Component<Props> {
  static defaultProps = {
    title: 'Keto: Egg-free meals #2',
    description: 'Here’s a week full of egg-free keto meals if you’re trying to avoid eggs for whatever reason (but you don’t need a reason, really). Enjoy three meals per day with no eggs lurking around in the ingredients, while keeping your carb intake below 20 grams per day. You’ll be feasting on some crispy fried pork belly, butter-fried fish with tandoori sauce, pork chops with blue cheese sauce, fried salmon with broc’n’cheese and much more, while keeping your carb intake below 20 grams per day.',
    items: [{
      title: 'Mon',
      image: 'https://i.dietdoctor.com/wp-content/uploads/2018/12/DD-667-porkbellywithoniongravy.jpg?auto=compress%2Cformat&w=150&h=225&fit=crop'
    },{
      title: 'Tue',
      image: 'https://i.dietdoctor.com/wp-content/uploads/2018/05/DD-627-butterfriedwhitefish.jpg?auto=compress%2Cformat&w=150&h=225&fit=crop'
    },{
      title: 'Wed',
      image: 'https://i.dietdoctor.com/wp-content/uploads/2016/03/DD-55-2.jpg?auto=compress%2Cformat&w=150&h=225&fit=crop'
    },{
      title: 'Thu',
      image: 'https://i.dietdoctor.com/wp-content/uploads/2016/08/DD-173-2.jpg?auto=compress%2Cformat&w=150&h=225&fit=crop'
    },{
      title: 'Fri',
      image: 'https://i.dietdoctor.com/wp-content/uploads/2018/12/DD-675-beefwithcabbagepuré.jpg?auto=compress%2Cformat&w=150&h=225&fit=crop'
    },{
      title: 'Sat',
      image: 'https://i.dietdoctor.com/wp-content/uploads/2017/04/DD-357-2.jpg?auto=compress%2Cformat&w=150&h=225&fit=crop'
    },{
      title: 'Sun',
      image: 'https://i.dietdoctor.com/wp-content/uploads/2018/12/DD-678-creamybluecheesechicken.jpg?auto=compress%2Cformat&w=150&h=225&fit=crop'
    }]
  }
  renderItem = ({ item }: RenderItem) => {
    return (
      <Card style={s.card}>
        <Card.Title title={item.title} style={s.title} titleStyle={{ color: '#333' }} />
        <Card.Cover source={{ uri: item.image }} style={s.card} />
      </Card>
    )
  }
  render () {
    const { title, description, items } = this.props
    return (
      <Card style={s.cardBig}>
        <Card.Title
          title={title}
          titleStyle={{ color: '#6188ce' }}
          subtitle={description}
          subtitleStyle={{ fontFamily: 'diet-doctor-sans-medium' }}
        />
        <Card.Content>
          <FlatList
            data={items}
            keyExtractor={(item, index) => `block-${index}`}
            renderItem={this.renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </Card.Content>
      </Card>
    )
  }
}

const s = StyleSheet.create({
  card: {
    height: 200,
    width: 120
  },
  cardBig: {
    height: 287,
    width: WIDTH - 20,
    margin: 10
  },
  title: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10
  }
})

export default React.memo(Block)
