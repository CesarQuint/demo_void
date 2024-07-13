require 'net/http'
require 'json'
require 'uri'

class EasyBrokerAPI
  BASE_URL = 'https://api.stagingeb.com/v1'
  API_KEY = 'TU_API_KEY_AQUI'  # Reemplaza esto con tu API Key de staging

  def initialize
    @headers = {
      'Content-Type' => 'application/json',
      'X-Authorization' => API_KEY
    }
  end

  def fetch_properties
    url = URI("#{BASE_URL}/properties")
    request = Net::HTTP::Get.new(url, @headers)
    response = Net::HTTP.start(url.hostname, url.port, use_ssl: true) do |http|
      http.request(request)
    end

    if response.is_a?(Net::HTTPSuccess)
      JSON.parse(response.body)['content']
    else
      puts "Error: #{response.message}"
      []
    end
  end

  def print_titles
    properties = fetch_properties
    properties.each do |property|
      puts property['title']
    end
  end
end

# Ejecución de la clase
easy_broker_api = EasyBrokerAPI.new
easy_broker_api.print_titles
