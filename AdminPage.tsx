import { useState } from 'react';
import { useApp, useSettings } from '@/context/AppContext';
import { 
  Settings, 
  Users, 
  Heart, 
  AlertTriangle, 
  ShoppingBag, 
  BookOpen, 
  Image,
  MessageSquare,
  LogOut,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import { cn } from '@/lib/utils';

type AdminTab = 'settings' | 'missionaries' | 'beneficiaries' | 'projects' | 'products' | 'blog' | 'gallery' | 'messages';

export function AdminPage() {
  const { state, dispatch } = useApp();
  const settings = useSettings();
  const [activeTab, setActiveTab] = useState<AdminTab>('settings');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showBankDetails, setShowBankDetails] = useState(settings.showBankDetails);

  // Simple auth - in production this should be proper authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'missao2024') {
      setIsAuthenticated(true);
      dispatch({ type: 'SET_ADMIN', payload: true });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    dispatch({ type: 'SET_ADMIN', payload: false });
    setPassword('');
  };

  const handleSaveSettings = () => {
    dispatch({ 
      type: 'UPDATE_SETTINGS', 
      payload: { ...settings, showBankDetails: showBankDetails } 
    });
    alert('Configurações salvas!');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-missionary-cream flex items-center justify-center pt-20">
        <div className="bg-white rounded-2xl p-8 shadow-missionary max-w-md w-full mx-4">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-missionary-green rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-cinzel text-2xl font-bold text-missionary-dark">
              Painel Administrativo
            </h1>
            <p className="text-missionary-brown mt-2">
              Digite a senha para acessar
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="w-full px-4 py-3 rounded-lg border border-missionary-beige mb-4 focus:ring-2 focus:ring-missionary-green focus:border-transparent"
            />
            <button
              type="submit"
              className="w-full btn-primary"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'settings', label: 'Configurações', icon: Settings },
    { id: 'missionaries', label: 'Missionários', icon: Users },
    { id: 'beneficiaries', label: 'Beneficiários', icon: Heart },
    { id: 'projects', label: 'Projetos Urgentes', icon: AlertTriangle },
    { id: 'products', label: 'Loja', icon: ShoppingBag },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'gallery', label: 'Galeria', icon: Image },
    { id: 'messages', label: 'Mensagens', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-missionary-cream pt-20">
      <div className="container-missionary py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-missionary overflow-hidden">
              <div className="p-6 bg-missionary-green text-white">
                <h2 className="font-cinzel text-xl font-bold">Admin</h2>
                <p className="text-white/70 text-sm">Painel de Controle</p>
              </div>
              
              <nav className="p-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as AdminTab)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors mb-1",
                      activeTab === tab.id
                        ? "bg-missionary-green text-white"
                        : "text-missionary-dark hover:bg-missionary-cream"
                    )}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </nav>

              <div className="p-4 border-t border-missionary-beige">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-missionary-urgent hover:bg-missionary-urgent/10 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Sair
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-missionary p-6 md:p-8">
              {activeTab === 'settings' && (
                <div>
                  <h2 className="font-cinzel text-2xl font-bold text-missionary-dark mb-6">
                    Configurações Gerais
                  </h2>

                  <div className="space-y-6">
                    {/* Organization Info */}
                    <div className="border-b border-missionary-beige pb-6">
                      <h3 className="font-cinzel text-lg font-bold text-missionary-dark mb-4">
                        Informações da Organização
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-missionary-dark mb-1">
                            Nome da Família
                          </label>
                          <input
                            type="text"
                            defaultValue={settings.familyName}
                            className="w-full px-4 py-2 rounded-lg border border-missionary-beige focus:ring-2 focus:ring-missionary-green"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-missionary-dark mb-1">
                            Versículo Lem
                          </label>
                          <input
                            type="text"
                            defaultValue={settings.verseMotto}
                            className="w-full px-4 py-2 rounded-lg border border-missionary-beige focus:ring-2 focus:ring-missionary-green"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="border-b border-missionary-beige pb-6">
                      <h3 className="font-cinzel text-lg font-bold text-missionary-dark mb-4">
                        Informações de Contato
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-missionary-dark mb-1">
                            Telefone Moçambique
                          </label>
                          <input
                            type="text"
                            defaultValue={settings.contact.phoneMozambique}
                            className="w-full px-4 py-2 rounded-lg border border-missionary-beige focus:ring-2 focus:ring-missionary-green"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-missionary-dark mb-1">
                            WhatsApp
                          </label>
                          <input
                            type="text"
                            defaultValue={settings.contact.whatsapp}
                            className="w-full px-4 py-2 rounded-lg border border-missionary-beige focus:ring-2 focus:ring-missionary-green"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-missionary-dark mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            defaultValue={settings.contact.email}
                            className="w-full px-4 py-2 rounded-lg border border-missionary-beige focus:ring-2 focus:ring-missionary-green"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-missionary-dark mb-1">
                            Endereço
                          </label>
                          <input
                            type="text"
                            defaultValue={settings.contact.physicalAddress}
                            className="w-full px-4 py-2 rounded-lg border border-missionary-beige focus:ring-2 focus:ring-missionary-green"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bank Details Toggle */}
                    <div className="border-b border-missionary-beige pb-6">
                      <h3 className="font-cinzel text-lg font-bold text-missionary-dark mb-4">
                        Dados Bancários
                      </h3>
                      <div className="flex items-center gap-4 mb-4">
                        <button
                          onClick={() => setShowBankDetails(!showBankDetails)}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                            showBankDetails
                              ? "bg-missionary-green text-white"
                              : "bg-missionary-cream text-missionary-dark"
                          )}
                        >
                          {showBankDetails ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          {showBankDetails ? 'Mostrar Publicamente' : 'Ocultar do Público'}
                        </button>
                      </div>

                      {showBankDetails && (
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-missionary-dark mb-1">
                              BIM - Conta
                            </label>
                            <input
                              type="text"
                              defaultValue={settings.bankDetails.bim.accountNumber}
                              className="w-full px-4 py-2 rounded-lg border border-missionary-beige focus:ring-2 focus:ring-missionary-green"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-missionary-dark mb-1">
                              BIM - IBAN
                            </label>
                            <input
                              type="text"
                              defaultValue={settings.bankDetails.bim.iban}
                              className="w-full px-4 py-2 rounded-lg border border-missionary-beige focus:ring-2 focus:ring-missionary-green"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                      <button
                        onClick={handleSaveSettings}
                        className="btn-primary flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Salvar Configurações
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'missionaries' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-cinzel text-2xl font-bold text-missionary-dark">
                      Gerenciar Missionários
                    </h2>
                    <button className="btn-primary">
                      + Adicionar Missionário
                    </button>
                  </div>

                  <div className="space-y-4">
                    {state.missionaries.map((missionary) => (
                      <div key={missionary.id} className="flex items-center gap-4 p-4 bg-missionary-cream rounded-xl">
                        <img
                          src={missionary.photo}
                          alt={missionary.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-missionary-dark">{missionary.name}</h4>
                          <p className="text-sm text-missionary-brown">{missionary.specialty} - {missionary.field}</p>
                        </div>
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium",
                          missionary.status === 'active' && "bg-missionary-green/10 text-missionary-green",
                          missionary.status === 'vacation' && "bg-missionary-gold/10 text-missionary-orange",
                          missionary.status === 'returned' && "bg-gray-100 text-gray-600",
                          missionary.status === 'transition' && "bg-blue-100 text-blue-600"
                        )}>
                          {missionary.status === 'active' && 'Ativo'}
                          {missionary.status === 'vacation' && 'De Férias'}
                          {missionary.status === 'returned' && 'Retornou'}
                          {missionary.status === 'transition' && 'Em Transição'}
                        </span>
                        <button
                          onClick={() => dispatch({ 
                            type: 'UPDATE_MISSIONARY', 
                            payload: { ...missionary, isVisible: !missionary.isVisible } 
                          })}
                          className={cn(
                            "px-3 py-1 rounded-lg text-xs font-medium transition-colors",
                            missionary.isVisible
                              ? "bg-missionary-green text-white"
                              : "bg-missionary-beige text-missionary-brown"
                          )}
                        >
                          {missionary.isVisible ? 'Visível' : 'Oculto'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'beneficiaries' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-cinzel text-2xl font-bold text-missionary-dark">
                      Gerenciar Beneficiários
                    </h2>
                    <button className="btn-primary">
                      + Adicionar Beneficiário
                    </button>
                  </div>

                  <div className="space-y-4">
                    {state.beneficiaries.map((beneficiary) => (
                      <div key={beneficiary.id} className="flex items-center gap-4 p-4 bg-missionary-cream rounded-xl">
                        <img
                          src={beneficiary.photo}
                          alt={beneficiary.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-missionary-dark">{beneficiary.name}</h4>
                          <p className="text-sm text-missionary-brown">
                            {beneficiary.location.district}, {beneficiary.location.province}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-missionary-dark">
                            {beneficiary.raisedAmount.toLocaleString()} / {beneficiary.needAmount.toLocaleString()} MZN
                          </p>
                          <p className="text-xs text-missionary-brown">
                            {Math.round((beneficiary.raisedAmount / beneficiary.needAmount) * 100)}% arrecadado
                          </p>
                        </div>
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium",
                          beneficiary.status === 'urgent' && "bg-missionary-urgent/10 text-missionary-urgent",
                          beneficiary.status === 'in_progress' && "bg-missionary-gold/10 text-missionary-orange",
                          beneficiary.status === 'completed' && "bg-missionary-green/10 text-missionary-green"
                        )}>
                          {beneficiary.status === 'urgent' && 'Urgente'}
                          {beneficiary.status === 'in_progress' && 'Em Andamento'}
                          {beneficiary.status === 'completed' && 'Concluído'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'projects' && (
                <div>
                  <h2 className="font-cinzel text-2xl font-bold text-missionary-dark mb-6">
                    Projetos Urgentes
                  </h2>
                  <p className="text-missionary-brown">
                    Gerencie os projetos urgentes destacados na página inicial.
                  </p>
                </div>
              )}

              {activeTab === 'products' && (
                <div>
                  <h2 className="font-cinzel text-2xl font-bold text-missionary-dark mb-6">
                    Loja Solidária
                  </h2>
                  <p className="text-missionary-brown">
                    Gerencie os produtos da loja.
                  </p>
                </div>
              )}

              {activeTab === 'blog' && (
                <div>
                  <h2 className="font-cinzel text-2xl font-bold text-missionary-dark mb-6">
                    Blog / Diário de Campo
                  </h2>
                  <p className="text-missionary-brown">
                    Gerencie as postagens do blog.
                  </p>
                </div>
              )}

              {activeTab === 'gallery' && (
                <div>
                  <h2 className="font-cinzel text-2xl font-bold text-missionary-dark mb-6">
                    Galeria de Fotos
                  </h2>
                  <p className="text-missionary-brown">
                    Gerencie os álbuns de fotos.
                  </p>
                </div>
              )}

              {activeTab === 'messages' && (
                <div>
                  <h2 className="font-cinzel text-2xl font-bold text-missionary-dark mb-6">
                    Mensagens Recebidas
                  </h2>
                  {state.contactMessages.length === 0 ? (
                    <p className="text-missionary-brown">Nenhuma mensagem recebida.</p>
                  ) : (
                    <div className="space-y-4">
                      {state.contactMessages.map((msg) => (
                        <div key={msg.id} className="p-4 bg-missionary-cream rounded-xl">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-missionary-dark">{msg.name}</h4>
                            <span className="text-xs text-missionary-brown">{msg.date}</span>
                          </div>
                          <p className="text-sm text-missionary-brown">{msg.subject}</p>
                          <p className="text-sm text-missionary-dark mt-2">{msg.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
