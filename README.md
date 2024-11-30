# ESO Arts Portfolio Website

A modern, responsive portfolio website for showcasing digital artwork and illustrations. This website is inspired by the Instagram profile [@esoarts_](https://www.instagram.com/esoarts_/).

## Features

- Responsive design that works on desktop and mobile devices
- Modern and clean user interface
- Gallery section for artwork display
- About section for artist information
- Contact section with social media links
- Smooth scrolling and animations

## Setup

1. Clone this repository
2. Add your artwork images to the `images` folder
3. Update the gallery items in `script.js` with your artwork information
4. Customize the content in `index.html` to match your needs
5. Modify the styles in `styles.css` if desired

## Structure

- `index.html` - Main HTML structure
- `styles.css` - All styling and animations
- `script.js` - JavaScript for gallery and interactions
- `images/` - Directory for artwork images

## Customization

### Adding Gallery Items

To add new artwork to the gallery, edit the `galleryItems` array in `script.js`:

```javascript
const galleryItems = [
    {
        id: 1,
        imageUrl: 'images/your-artwork.jpg',
        title: 'Your Artwork Title',
        description: 'Description of your artwork'
    },
    // Add more items here
];
```

### Modifying Colors

The color scheme can be customized in `styles.css` by editing the CSS variables:

```css
:root {
    --primary-color: #1a1a1a;
    --accent-color: #e91e63;
    --text-color: #333;
    --light-bg: #f5f5f5;
}
```

## Browser Support

This website is compatible with modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## License

This project is open source and available under the MIT License.
