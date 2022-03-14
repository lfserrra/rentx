import React, { useState, useRef } from 'react';
import { FlatList, ViewToken } from 'react-native';

import { Bullet } from '../Bullet';

import {
  Container,
  ImageIndexes,
  CarImageWrapper,
  CarImage
} from './styles';

interface Props {
  imagesUrl: {
    id: string;
    photo: string;
  }[]
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imagesUrl }: Props) {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;

    setImageIndex(index);
  });

  return (
    <Container>
      <ImageIndexes>
        {
          imagesUrl.map((item, i) => (
            <Bullet
              key={item.id}
              active={i === imageIndex}
            />
          ))
        }
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage
              source={{ uri: item.photo }}
              resizeMode='contain'
            />
          </CarImageWrapper>
        )}
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  );
}