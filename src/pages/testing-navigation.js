import React from "react"
import { graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

class TestNavigation extends React.Component {
  render() {
    const { data } = this.props
    const listofFolders = data.allDirectory.edges

    return (
      <Layout
        location={this.props.location}
        title={"testing folder navigation"}
      >
        <SEO title="Navigation" />
        <Bio />
        <div
          style={{
            display: "flex",
            margin: "0 auto",
            flexDirection:'column',
            alignContent:'center',
            justifyContent:'space-around'
          }}
        >
          <div>
              
            {listofFolders.map(({ node }) =>
              node.relativeDirectory === "" ? (
                <div>
                  <p>{node.relativePath}</p> <p>is a root folder</p>
                </div>
              ) : (
                <div>Folder: {node.base } is a child of {node.relativeDirectory}</div>
              )
            )}
          </div>
          <div>
            <h3>this is the direct output of the query </h3>
            <pre>{JSON.stringify(listofFolders, null, 2)}</pre>
          </div>
        </div>
      </Layout>
    )
  }
}

export default TestNavigation

export const pageQuery = graphql`
  query {
    allDirectory(filter: {sourceInstanceName: {ne: "assets"}}) {
      edges {
        node {
          relativeDirectory
          relativePath
          base
        }
      }
    }
  }
  
`
