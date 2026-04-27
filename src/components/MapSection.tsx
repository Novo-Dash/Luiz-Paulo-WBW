export default function MapSection() {
  return (
    <section
      style={{
        backgroundColor: '#FFFFFF',
        padding: '0',
        width: '100%',
        lineHeight: 0,
      }}
    >
      <iframe
        title="Luiz Paulo BJJ Location"
        src="https://maps.google.com/maps?q=123+Washington+Street,+Norwood,+MA+02062&t=&z=15&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="480"
        style={{ border: 0, display: 'block' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  );
}
