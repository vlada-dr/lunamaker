import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const filters = [
  [{
    photo: 'https://images.unsplash.com/photo-1417436026361-a033044d901f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=faa4e192f33e0d6b7ce0e54f15140e42',
    title: 'Для нього',
  },
  {
    photo: 'https://images.unsplash.com/photo-1417436026361-a033044d901f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=faa4e192f33e0d6b7ce0e54f15140e42',
    title: 'Для неї',
  }, {
    photo: 'https://images.unsplash.com/photo-1417436026361-a033044d901f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=faa4e192f33e0d6b7ce0e54f15140e42',
    title: 'На день народження',
  },
  {
    photo: 'https://images.unsplash.com/photo-1417436026361-a033044d901f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=faa4e192f33e0d6b7ce0e54f15140e42',
    title: 'Для неї',
  }], [{
    photo: 'https://images.unsplash.com/photo-1417436026361-a033044d901f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=faa4e192f33e0d6b7ce0e54f15140e42',
    title: 'Фіолетового кольору',
  },
  {
    photo: 'https://images.unsplash.com/photo-1417436026361-a033044d901f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=faa4e192f33e0d6b7ce0e54f15140e42',
    title: 'На весілля',
  }, {
    photo: 'https://images.unsplash.com/photo-1417436026361-a033044d901f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=faa4e192f33e0d6b7ce0e54f15140e42',
    title: 'Для нього',
  },
  {
    photo: 'https://images.unsplash.com/photo-1417436026361-a033044d901f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=faa4e192f33e0d6b7ce0e54f15140e42',
    title: 'Для неї',
  }],
];

export const PopularFilters = () => (
  <div>
    {
      filters.map((row) => (
        <Wrapper>
          {row.map(({ photo, title }) => (
            <Category>
              <Image src={photo} />
              <Content>
                {title}
              </Content>
            </Category>
            ))}
        </Wrapper>
      ))
    }
  </div>
);

const sizes = {
  width: 200,
}

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1000px;
  display: flex;
  
  &:nth-of-type(2) {
    margin-top: -55px;
    
    & > * {
      &:first-child {
        margin-left: 110px;
      }
    }
  }
  
  &:first-of-type {
    padding-top: 100px;
  }
`;

const Content = styled.div`
  position: absolute;
  bottom: 10%;
  left: 50%;
  width: 100%;

  font-size: 24px;
  opacity: 0; 
  text-align: center;
  color: white;
  will-change: transform;
  backface-visibility: hidden;
  transform: translate(-50%, -50%) scale(0.9);
  transition: all 0.5s;
  shape-outside:   polygon(
    50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%
);
  `;

const Category = styled.div`
  position: relative;
  margin: 10px;
  width: 200px;
  float: left;
  transition: all 0.5s;

  overflow: hidden;

  clip-path: polygon(
    50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%
  );

  &:before {
    display: block;
    padding-top: 112.5%;
    content: '';
  }
  
  &:hover {
    & > * {
      opacity: 1;
    }
  }
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-position: center center;
  background-size: cover;

  overflow: hidden;

  clip-path: polygon(
    50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%
  );
`;

