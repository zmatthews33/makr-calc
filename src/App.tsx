/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react"

// components
import { Container, Form, FormText, Button, Row, Col, Card } from "react-bootstrap"

// styles
import "bootstrap/dist/css/bootstrap.min.css"

const data = {
  "Fine Art Scans": [
    { subCategory: "2D WideTek 600dpi Scan", min: 15.0, costPerSqInch: 0.06 },
    { subCategory: "2D Metis 600dpi Scan", min: 25.0, costPerSqInch: 0.15 },
    { subCategory: "3D Metis 600dpi Texture Scan", min: 40.0, costPerSqInch: 0.25 }
  ],
  "Fine Art Prints": [
    { subCategory: "Print Only 2D - Satin Finished Canvas", min: 15.0, costPerSqInch: 0.015 },
    { subCategory: "Print Only - Standard Texture", min: 50.0, costPerSqInch: 0.25 },
    { subCategory: "3D Metis 600dpi Texture Scan", min: 75.0, costPerSqInch: 0.35 }
  ]
}

const stretcherBars = {
  ".075 - Light Bar": [
    { size: "8x10", price: "8.98" },
    { size: "11x14", price: "11.12" },
    { size: "12x12", price: "10.40" },
    { size: "12x18", price: "12.47" },
    { size: "12x24", price: "14.18" },
    { size: "16x16", price: "13.68" },
    { size: "16x20", price: "14.68" },
    { size: "18x24", price: "16.25" },
    { size: "20x24", price: "16.82" },
    { size: "20x30", price: "28.85" },
    { size: "24x24", price: "17.96" },
    { size: "24x30", price: "30.79" },
    { size: "24x36", price: "34.50" },
    { size: "30x40", price: "62.77" },
    { size: "36x36", price: "67.12" },
    { size: "36x54", price: "83.44" },
    { size: "48x48", price: "86.16" },
    { size: "40x60", price: "97.40" }
  ],
  "1.5 - Medium Bar": [
    { size: "8x10", price: "15.32" },
    { size: "11x14", price: "16.96" },
    { size: "12x12", price: "17.10" },
    { size: "12x18", price: "20.09" },
    { size: "12x24", price: "22.23" },
    { size: "16x16", price: "20.52" },
    { size: "16x20", price: "22.37" },
    { size: "18x24", price: "25.22" },
    { size: "20x24", price: "25.79" },
    { size: "20x30", price: "40.18" },
    { size: "24x24", price: "27.36" },
    { size: "24x30", price: "42.54" },
    { size: "24x36", price: "48.81" },
    { size: "30x40", price: "81.30" },
    { size: "36x36", price: "86.63" },
    { size: "36x54", price: "103.73" },
    { size: "48x48", price: "108.66" },
    { size: "40x60", price: "114.75" }
  ],
  "1.75 - Heavy Bar": [
    { size: "8x10", price: "22.02" },
    { size: "11x14", price: "23.94" },
    { size: "12x12", price: "23.23" },
    { size: "12x18", price: "26.72" },
    { size: "12x24", price: "31.14" },
    { size: "16x16", price: "28.07" },
    { size: "16x20", price: "30.85" },
    { size: "18x24", price: "34.63" },
    { size: "20x24", price: "36.34" },
    { size: "20x30", price: "50.27" },
    { size: "24x24", price: "39.05" },
    { size: "24x30", price: "53.80" },
    { size: "24x36", price: "58.93" },
    { size: "30x40", price: "92.15" },
    { size: "36x36", price: "94.06" },
    { size: "36x54", price: "115.50" },
    { size: "48x48", price: "123.55" },
    { size: "40x60", price: "131.70" },
    { size: "46x46", price: "81.37" },
    { size: "56x72", price: "210.12" },
    { size: "60x80", price: "234.00" }
  ]
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedStretcherBar, setSelectedStretcherBar] = useState("")
  const [length, setLength] = useState("")
  const [width, setWidth] = useState("")
  const [prices, setPrices] = useState([])
  const [errors, setErrors] = useState({ length: "", width: "", category: "" })

  const handleCategoryChange = (e: any) => setSelectedCategory(e.target.value)
  const handleStretcherBarChange = (e: any) => setSelectedStretcherBar(e.target.value)

  const handleLengthChange = (e: any) => {
    setLength(e.target.value)
  }

  const handleWidthChange = (e: any) => {
    setWidth(e.target.value)
  }

  const calculatePrices = () => {
    if (!selectedCategory || errors.length || errors.width) return []

    const lengthValue = parseFloat(length)
    const widthValue = parseFloat(width)
    const area = lengthValue * widthValue
    // @ts-expect-error
    const subcategories = data[selectedCategory]
    return subcategories.map((sub: any) => {
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

  // if price is below $25 display mimimum price of $25

  const getStretcherBarPrice = (price: string) => {
    return Math.max(parseFloat(price), 25.0).toFixed(2)
  }

  return (
    <Container>
      <Container className='calculator-wrapper'>
        <h1 className='my-4'>Price Estimator</h1>

        <Form>
          <Row>
            <Form.Group controlId='formCategory'>
              <Form.Label>Select Category:</Form.Label>
              <Form.Select size='lg' onChange={handleCategoryChange} value={selectedCategory}>
                <option value=''>-</option>
                {Object.keys(data).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
              {errors.category && <FormText className='error-message'>{errors.category}</FormText>}
            </Form.Group>
          </Row>
          <Row className='mt-4'>
            <Col>
              <Form.Group controlId='formLength'>
                <Form.Label>Enter Length:</Form.Label>
                <Form.Control
                  type='text'
                  size='lg'
                  placeholder='-'
                  onChange={handleLengthChange}
                  value={length}
                  required
                />
                {errors.length && <FormText className='error-message'>{errors.length}</FormText>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='formWidth'>
                <Form.Label>Enter Width:</Form.Label>
                <Form.Control
                  type='text'
                  size='lg'
                  placeholder='-'
                  onChange={handleWidthChange}
                  value={width}
                  required
                />
                {errors.width && <FormText className='error-message'>{errors.width}</FormText>}
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
              {prices.length === 0 && !errors.category && !errors.length && !errors.width ? (
                <p>No prices to display. Please enter valid dimensions and select a category.</p>
              ) : (
                prices.map((result, index) => (
                  <Card key={index} className='mb-2 calc-card'>
                    <Card.Body>
                      {/* @ts-ignore */}
                      <Card.Title>{result.subCategory}</Card.Title>
                      {/* @ts-ignore */}
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
        <h2>Stretched Canvas Prices</h2>
        <Form.Group controlId='formStretcherBar'>
          <Form.Label>Select Stretcher Bar Depth:</Form.Label>
          <Form.Select size='lg' onChange={handleStretcherBarChange} value={selectedStretcherBar}>
            <option value=''>-</option>
            {Object.keys(stretcherBars).map((depth) => (
              <option key={depth} value={depth}>
                {depth}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Row className='mt-4'>
          {selectedStretcherBar &&
          /* @ts-ignore */
            stretcherBars[selectedStretcherBar].map((item, index) => (
              <Col key={index} xs={4} sm={4} md={3} lg={3}>
                <Card className='mb-4 text-center stretcher-card'>
                  <Card.Body>
                    <Card.Title>{item.size}</Card.Title>
                    <Card.Text>${getStretcherBarPrice(item.price)}</Card.Text>
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
