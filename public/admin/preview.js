// Custom preview template for Decap CMS
// Shows content as it will appear on the live site

const previewStyle = {
  fontFamily: 'system-ui, -apple-system, sans-serif',
  background: '#fff',
  color: '#000',
  padding: '40px',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0',
};

// Global text reset styles
const textStyles = {
  fontFamily: 'inherit',
  color: '#000',
  margin: '0',
  padding: '0',
};

// Home page preview
CMS.registerPreviewTemplate('home', {
  render(entry) {
    const data = entry.getIn(['data']).toJS();

    return (
      <div style={previewStyle}>
        <div style={{ borderBottom: '4px solid #000', paddingBottom: '24px', marginBottom: '32px' }}>
          <h1 style={{ ...textStyles, fontSize: '48px', fontWeight: '700', marginBottom: '16px' }}>
            {data.title || 'PlusWars'}
          </h1>
          <p style={{ ...textStyles, fontSize: '20px', color: '#666', marginBottom: '16px' }}>
            {data.subtitle || ''}
          </p>
          <p style={{ ...textStyles, fontSize: '16px', lineHeight: '1.6', color: '#000' }}>
            {data.story || ''}
          </p>
        </div>
      </div>
    );
  }
});

// Construction preview
CMS.registerPreviewTemplate('constructions', {
  render(entry) {
    const data = entry.getIn(['data']).toJS();
    const images = Array.isArray(data.images) ? data.images : [];

    return (
      <div style={previewStyle}>
        <div style={{ border: '4px solid #000', background: '#fff', boxShadow: '8px 8px 0px rgba(0,0,0,0.1)', padding: '24px' }}>
          <h2 style={{ ...textStyles, fontSize: '28px', fontWeight: '700', marginBottom: '12px' }}>
            {data.title || 'Untitled'}
          </h2>
          <p style={{ ...textStyles, fontSize: '14px', color: '#666', marginBottom: '16px' }}>
            {data.description || ''}
          </p>
          {images.length > 0 && (
            <div style={{ display: 'grid', gap: '12px', marginTop: '16px' }}>
              {images.map((img, idx) => (
                <div key={idx} style={{ background: '#f0f0f0', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #000', overflow: 'hidden' }}>
                  {typeof img === 'string' && img.startsWith('/') && (
                    <img src={img} alt="Construction" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
});

// Construction types preview
CMS.registerPreviewTemplate('construction_types', {
  render(entry) {
    const data = entry.getIn(['data']).toJS();
    const types = Array.isArray(data.types) ? data.types : [];

    return (
      <div style={previewStyle}>
        <h1 style={{ ...textStyles, fontSize: '36px', fontWeight: '700', marginBottom: '32px' }}>
          Construction Types
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '24px' }}>
          {types.map((type, idx) => (
            <div key={idx} style={{ border: '4px solid #000', background: '#fff', boxShadow: '8px 8px 0px rgba(0,0,0,0.1)', padding: '0', overflow: 'hidden' }}>
              <div style={{ background: '#f0f0f0', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #000', fontSize: '24px' }}>
                {type.image && typeof type.image === 'string' && type.image.startsWith('/') ? (
                  <img src={type.image} alt={type.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  '📷'
                )}
              </div>
              <div style={{ padding: '16px' }}>
                <h3 style={{ ...textStyles, fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>
                  {type.name || 'Untitled'}
                </h3>
                <p style={{ ...textStyles, fontSize: '12px', color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {type.description || ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
});
