import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header, Button, Layout } from 'ui/atoms';
import { DeleteIcon, EditIcon } from 'ui/icons';
import { Link, withRouter } from 'react-router-dom';
import { Present } from 'features/present';
import { all } from '../actions';


const mapStateToProps = state => ({
  presents: state.present.presents,
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(all()),
});

class TableView extends React.Component {
  static propTypes = {
    onLoad: PropTypes.func,
    presents: PropTypes.arrayOf(Present),
  };

  static defaultProps = {
    onLoad: null,
    presents: [],
  };

  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    const { presents } = this.props;

    return (
      <div>
        <Header>
          Адмін-панель
        </Header>
        <Table>
          {presents && presents.map(p => (
            <tr key={p.slug}>
              <td>
                <Image src={p.images[0]} />
              </td>
              <td>
                <p>
                  {p.title}
                </p>
                <p>
                  {p.body}
                </p>
              </td>
              <td>
                <Layout flow='row' justify='center'>
                  <Link to={`/present/${p.slug}/edit`}>
                    <EditIcon />
                  </Link>
                  <DeleteIcon />
                </Layout>
                <Button secondary>
                  Підтвердити
                </Button>
              </td>
            </tr>
          ))}
        </Table>
      </div>
    );
  }
}

const Image = styled.img`
  width: 200px;
  height: 200px;
`;

const Table = styled.table`
  width: 90%;
  margin: auto;
  
  td {
    padding: ${size.m};
  }
  
  svg {
    width: ${size.l};
    height: ${size.l};
    margin: ${size.s};
    fill: ${color.darkGray};
  }
  
  ${Button} {
    margin-top: ${size.m};
  }
`;

export const PresentsTable = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TableView),
);
