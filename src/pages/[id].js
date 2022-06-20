import ProductService from '../api/product-service';


export async function getStaticPaths() {
  const data = await ProductService.getTable();
  const paths = data.people.map((_, index) => ({
    params: { id: index.toString() }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {
  return {
    props: {
      info: await ProductService.getProduct(params.id)
    },
    revalidate: 30
  }
}

export default function Person({ info }) {
  return (
    <div>
      <h1>{info.map((prop, i) => <p key={i}>{prop}</p>)}</h1>
    </div>
  )
}