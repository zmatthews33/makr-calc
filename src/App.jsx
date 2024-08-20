import { useState } from "react"

// components
import { Container, Form, FormText, Button, Row, Col, Card } from "react-bootstrap"

// styles
import "bootstrap/dist/css/bootstrap.min.css"

const data = {
  "Fine Art and Photography Scans": [
    { subCategory: "2D WideTek 600dpi Scan", min: 15.0, costPerSqInch: 0.06 },
    { subCategory: "2D Metis 600dpi Scan", min: 25.0, costPerSqInch: 0.15 },
    { subCategory: "3D Metis 600dpi Texture Scan", min: 40.0, costPerSqInch: 0.25 }
  ],
  "Fine Art and Photography Prints": [
    { subCategory: "Print Only 2D - Satin Finished Canvas", min: 15.0, costPerSqInch: 0.015 },
    { subCategory: "Print Only - Standard Texture", min: 50.0, costPerSqInch: 0.25 },
    { subCategory: "3D Metis 600dpi Texture Scan", min: 75.0, costPerSqInch: 0.35 }
  ]
}

const stretcherBars = {
  ".075 Thin Wrap": [
    { size: "8x10", price: "$32.99" },
    { size: "11x14", price: "$39.99" },
    { size: "16x20", price: "$49.99" },
    { size: "20x24", price: "$59.99" },
    { size: "24x36", price: "$69.99" }
  ],
  "1.25 Thin Wrap": [
    { size: "8x10", price: "$40.99" },
    { size: "11x14", price: "$69.99" },
    { size: "16x20", price: "$89.99" },
    { size: "20x24", price: "$89.99" },
    { size: "24x36", price: "$109.99" }
  ]
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedStretcherBar, setSelectedStretcherBar] = useState("")
  const [length, setLength] = useState("")
  const [width, setWidth] = useState("")
  const [prices, setPrices] = useState([])
  const [errors, setErrors] = useState({ length: "", width: "", category: "" })

  const handleCategoryChange = (e) => setSelectedCategory(e.target.value)
  const handleStretcherBarChange = (e) => setSelectedStretcherBar(e.target.value)

  const handleLengthChange = (e) => {
    setLength(e.target.value)
  }

  const handleWidthChange = (e) => {
    setWidth(e.target.value)
  }

  const calculatePrices = () => {
    if (!selectedCategory || errors.length || errors.width) return []

    const lengthValue = parseFloat(length)
    const widthValue = parseFloat(width)
    const area = lengthValue * widthValue
    const subcategories = data[selectedCategory]

    return subcategories.map((sub) => {
      const calculatedPrice = area * sub.costPerSqInch
      return {
        subCategory: sub.subCategory,
        price: Math.max(calculatedPrice, sub.min)
      }
    })
  }

  const handleSeePricesClick = () => {
    let valid = true

    // Clear previous errors
    setErrors({ length: "", width: "", category: "" })

    // Validate inputs
    if (!selectedCategory) {
      setErrors((prev) => ({ ...prev, category: "Please select a category." }))
      valid = false
    }

    const lengthValue = parseFloat(length)
    if (isNaN(lengthValue) || lengthValue < 6 || lengthValue > 48) {
      setErrors((prev) => ({ ...prev, length: "Length must be between 6 and 48 inches." }))
      valid = false
    }

    const widthValue = parseFloat(width)
    if (isNaN(widthValue) || widthValue < 6 || widthValue > 60) {
      setErrors((prev) => ({ ...prev, width: "Width must be between 6 and 60 inches." }))
      valid = false
    }

    if (valid) {
      setPrices(calculatePrices())
    }
  }

  return (
    <Container>
      <Container className='calculator-wrapper'>
        <h1 className='my-4'>Price Estimator</h1>

        <Form>
          <Row>
            <Form.Group controlId='formCategory'>
              <Form.Label>Select Category:</Form.Label>
              <Form.Select size='lg' as='select' onChange={handleCategoryChange} value={selectedCategory}>
                <option value=''>Select Category</option>
                {Object.keys(data).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
              {errors.category && <FormText variant='danger'>{errors.category}</FormText>}
            </Form.Group>
          </Row>
          <Row className='mt-4'>
            <Col>
              <Form.Group controlId='formLength'>
                <Form.Label>Enter Length:</Form.Label>
                <Form.Control
                  type='text'
                  size='lg'
                  placeholder='Length'
                  onChange={handleLengthChange}
                  value={length}
                  required
                />
                {errors.length && <FormText variant='danger'>{errors.length}</FormText>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='formWidth'>
                <Form.Label>Enter Width:</Form.Label>
                <Form.Control
                  size='lg'
                  type='text'
                  placeholder='Width'
                  onChange={handleWidthChange}
                  value={width}
                  required
                />
                {errors.width && <FormText variant='danger'>{errors.width}</FormText>}
              </Form.Group>
            </Col>
          </Row>
          <Button className='mt-5 see-prices-btn' onClick={handleSeePricesClick}>
            SEE PRICES
          </Button>
        </Form>

        {prices.length > 0 && (
          <Row className='mt-4'>
            <hr></hr>
            <Col>
              <h2>
                Prices for <br />
                {selectedCategory}
              </h2>
              <h2>
                at {length} in. x {width} in.
              </h2>
              {prices.length === 0 && !errors.category && !errors.length && !errors.width ? (
                <p>No prices to display. Please enter valid dimensions and select a category.</p>
              ) : (
                prices.map((result, index) => (
                  <Card key={index} className='mb-2 calc-card'>
                    <Card.Body>
                      <Card.Title>{result.subCategory}</Card.Title>
                      <Card.Text>${result.price.toFixed(2)}</Card.Text>
                    </Card.Body>
                  </Card>
                ))
              )}
            </Col>
          </Row>
        )}
      </Container>
      <hr />
      <Container className='stretcher-wrapper'>
        <h2>Canvas Wraps </h2>
        <h3>Traditionally Stretched</h3>
        {/* table goes here... */}
        <Form.Group controlId='formStretcherBar'>
          <Form.Label>Select Stretcher Bar Depth:</Form.Label>
          <Form.Select size='lg' as='select' onChange={handleStretcherBarChange} value={selectedStretcherBar}>
            <option value=''>Select Stretcher Bar Depth</option>
            {Object.keys(stretcherBars).map((depth) => (
              <option key={depth} value={depth}>
                {depth}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        {/* Render Button-Sized Cards */}
        <Row className='mt-4'>
          {selectedStretcherBar &&
            stretcherBars[selectedStretcherBar].map((item, index) => (
              <Col key={index} xs={4} sm={4} md={3} lg={3}>
                <Card className='mb-4 text-center stretcher-card'>
                  <Card.Body>
                    <Card.Title>{item.size}</Card.Title>
                    <Card.Text>{item.price}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </Container>
  )
}

export default App
